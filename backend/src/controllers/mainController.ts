import { Request, Response } from 'express';
import Tag from "../models/Tag";
import Platform from "../models/Platform";
import Lang from "../models/Lang";
import Program from "../models/Program";
import Comment from '../models/Comment';
import User from '../models/User';
import Config from '../models/Config';


export const getPrograms = async (req: Request, res: Response) => {
    try {
        const { params, userId } = req.body;
        const user = await User.findById(userId);

        let limit = 30;
        const {
            page,
            text,
            niches,
            platforms,
            locations,
            hideInter,
            minCommissionPercent,
            maxCommissionPercent,
            minCommissionAmount,
            maxCommissionAmount,
            easy2Join,
            relationShip,
            paymentDeadline,
            type,
            productType,
            hideApplied,
            directedProgram,
            isPromoted,
            group,
            sortType
        } = params;

        let skip = Math.max(0, page - 1) * limit;
        let fields = ["tags", "platform"];

        const today = new Date();

        if (!user?.isPremium) {
            skip = 0;
            limit = 30;
        } else {
            if (user.membershipEndDate.getTime() < today.getTime()) {
                skip = 0;
                limit = 30;
            }
        }

        let query: any = {};

        [locations].forEach((item, index) => {
            if (item?.length)
                query.langs = {
                    $in: item.map((i: string | number | any) => parseInt(i)),
                };
        });

        [niches, platforms].forEach((item, index) => {
            if (item?.length)
                query[`${fields[index]}`] = {
                    $in: item.map((i: string | number | any) => parseInt(i)),
                };
        });

        if (text) query.name = { $regex: text, $options: "i" };

        if (hideInter) query.is_international = { $ne: 1 };

        if (minCommissionPercent) query.commission_in_percentage = {
            ...query.commission_in_percentage,
            $gte: minCommissionPercent / 100
        };
        if (maxCommissionPercent) query.commission_in_percentage = {
            ...query.commission_in_percentage,
            $lte: maxCommissionPercent / 100
        };
        if (minCommissionAmount) query.commission_amount = {
            ...query.commission_amount,
            $gte: parseFloat(minCommissionAmount)
        };
        if (maxCommissionAmount) query.commission_amount = {
            ...query.commission_amount,
            $lte: parseFloat(maxCommissionAmount)
        };

        if (easy2Join !== 0 || relationShip !== 0 || paymentDeadline !== 0) {
            query.average_ratings = { $elemMatch: {} };
            if (easy2Join !== 0) {
                query.average_ratings.$elemMatch.easy_to_join = { $lte: easy2Join.toString() };
            }
            if (relationShip !== 0) {
                query.average_ratings.$elemMatch.relationship = { $lte: relationShip.toString() };
            }
            if (paymentDeadline !== 0) {
                query.average_ratings.$elemMatch.payment_deadline = { $lte: paymentDeadline.toString() };
            }
        }

        if (type !== "all" && type?.trim()) query.commission_type = type;

        if (productType !== "all" && productType?.trim())
            query["product_type.machine_name"] = productType;

        if (directedProgram) query["has_featured_image"] = true;

        const date = new Date();
        date.setDate(date.getDate() - 3);

        switch (group) {
            case 'all':
                break;
            case 'promoted':
                query.promoted = 1;
                break;
            case 'favorites':
                break;
            case 'applied':
                query.is_international = 1;
                break;
            case 'last_added':
                query.createdAt = { $gte: date };
                break;
            default:
                break;
        }

        let sort: any = {};
        switch (sortType) {
            case 'name_asc':
                sort = { name: 1 };
                break;
            case 'name_desc':
                sort = { name: -1 };
                break;
            case 'latest_update':
                sort = { updatedAt: -1 };
                break;
            case 'ca_asc':
                sort = { commission_amount: 1 };
                break;
            case 'ca_desc':
                sort = { commission_amount: -1 };
                break;
            case 'cp_asc':
                sort = { commission_in_percentage: 1 };
                break;
            case 'cp_desc':
                sort = { commission_in_percentage: -1 };
                break;
            default:
                sort = { updatedAt: 1 };
                break;
        }

        const totalCount = await Program.find(query).countDocuments();

        const programs = await Program.aggregate([
            { $match: query },
            { $sort: sort },
            { $skip: skip },
            // { $limit: limit },
            {
                $lookup: {
                    from: "tags",
                    localField: "tags",
                    foreignField: "id",
                    as: "tags",
                }
            },
            {
                $lookup: {
                    from: "langs",
                    localField: "langs",
                    foreignField: "id",
                    as: "langs",
                }
            },
            {
                $lookup: {
                    from: "platforms",
                    localField: "platform",
                    foreignField: "id",
                    as: "platform",
                }
            },
            {
                $unwind: {
                    path: "$platform",
                }
            },
        ]);
        console.log(programs)
        res.status(200).json({
            message: 'Success',
            programs,
            page: params.page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong on our end. Please try again later!' });
    }
}


export const getPromoted = async (req: Request, res: Response) => {
    try {
        const data = await Program.aggregate([
            { $match: { promoted: 1 } },
            { $sample: { size: 1 } }
        ]);
        const program = data.length > 0 ? data[0] : null;
        if (program) {
            res.status(200).json({ message: 'Success', program });
        } else {
            res.status(404).send({ message: 'No promoted program found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong on our end. Please try again later!' });
    }
}


export const getSamplePrograms = async (req: Request, res: Response) => {
    try {
        const data = await Program.aggregate([
            { $sample: { size: 6 } }
        ]);
        res.status(200).json({ message: 'Success', programs: data });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong on our end. Please try again later!' });
    }
}

export const getProgram = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.body;
        if (uuid) {
            const data = await Program.aggregate([
                { $match: { uuid } },
                {
                    $lookup: {
                        from: "tags",
                        localField: "tags",
                        foreignField: "id",
                        as: "tags",
                    }
                },
                {
                    $lookup: {
                        from: "langs",
                        localField: "langs",
                        foreignField: "id",
                        as: "langs",
                    }
                },
                {
                    $lookup: {
                        from: "platforms",
                        localField: "platform",
                        foreignField: "id",
                        as: "platform",
                    }
                },
                {
                    $unwind: {
                        path: "$platform",
                    }
                },
                {
                    $limit: 1,
                }
            ]);
            const program = data.length > 0 ? data[0] : null;
            if (program) {
                const applies = []
                res.status(200).json({ program: { ...program } });
            } else {
                res.status(404).send({ message: 'Not Found' });
            }
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong on our end. Please try again later!' });
    }
}

export const getSearchParams = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find({});
        const platforms = await Platform.find({});
        const langs = await Lang.find({});
        res.status(200).json({
            tags,
            platforms,
            langs
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong on our end. Please try again later!' });
    }
}

export const postComment = async (req: Request, res: Response) => {
    try {
        const { programId, userId, comment }: { programId: string; userId: string; comment: string; } = req.body;
        const newComment = new Comment({ user: userId, program: programId, content: comment });
        await newComment.save();
        await newComment.populate('user');
        res.status(201).send({ message: 'Comment posted successfully', comment: newComment });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong on our end. Please try again later!' });
    }
}

export const getComments = async (req: Request, res: Response) => {
    try {
        const { programId, userId, sortBy }: { programId: string | null; userId: string | null; sortBy: string | null; } = req.body;
        const query: any = {};
        if (programId) {
            query.program = programId;
        }
        if (userId) {
            query.user = userId;
        }
        let sort: any = {
            createdAt: -1
        };
        if (sortBy) {
            sort[sortBy] = -1;
        }
        const comments = await Comment.find(query)
            .populate('user')
            .sort(sort)
            .limit(10);
        res.status(200).json({ comments });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong on our end. Please try again later!' });
    }
}

export const addVote = async (req: Request, res: Response) => {
    try {
        const { programId, commentId, userId, voteType } = req.body;
        if (programId) {
            const program = await Program.findById(programId);
            if (!program) {
                res.status(404).send({ message: 'Program not found' });
                return
            }
            updateVotes(program, userId, voteType);
            await program.save();
            res.status(200).send({ message: 'Vote updated', program });

        } else if (commentId) {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                res.status(404).send({ message: 'Comment not found' });
                return
            }

            updateVotes(comment, userId, voteType);
            await comment.save();
            res.status(200).send({ message: 'Vote updated', comment });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong on our end. Please try again later!' });
    }
}

const updateVotes = (entity: any, userId: string, voteType: string) => {
    if (voteType === 'up') {
        if (!entity.up_votes.includes(userId)) {
            entity.up_votes.push(userId);
        }
        entity.down_votes = entity.down_votes.filter((v: string) => v !== userId);
    } else if (voteType === 'down') {
        if (!entity.down_votes.includes(userId)) {
            entity.down_votes.push(userId);
        }
        entity.up_votes = entity.up_votes.filter((v: string) => v !== userId);
    }
}

export const getConfig = async (req: Request, res: Response) => {
    try {
        const config = await Config.findOne({ type: 'system' });
        res.status(200).json({ config });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong on our end. Please try again later!' });
    }
}