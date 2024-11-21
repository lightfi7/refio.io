import { Request, Response } from 'express';
import Tag from "../models/Tag";
import Platform from "../models/Platform";
import Lang from "../models/Lang";
import Program from "../models/Program";
import Apply from "../models/Apply";
import Config from '../models/Config';


export const getPrograms = async (req: Request, res: Response) => {
    try {
        const { params } = req.body;
        const limit = 50;
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

        const d = new Date();
        d.setDate(d.getDate() - 3);

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
                query.createdAt = { $gte: d };
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
            { $limit: limit },
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

export const getProgram = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.body;
        if (uuid) {
            const data = await Program.aggregate([
                { $match: { uuid } },
                {
                    $lookup: {
                        from: "Tag",
                        localField: "tags",
                        foreignField: "id",
                        as: "tags",
                    }
                },
                {
                    $lookup: {
                        from: "Lang",
                        localField: "langs",
                        foreignField: "id",
                        as: "langs",
                    }
                },
                {
                    $lookup: {
                        from: "Platform",
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
                const applies = await Apply.find({ program: program })
                    .populate('User Program', undefined, undefined, { strictPopulate: false });
                res.status(200).json({ program: { ...program, applies } });
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

export const getConfig = async (req: Request, res: Response) => {
    try {
        const config = await Config.findOne({});
        res.status(200).json({ config });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong on our end. Please try again later!' });
    }
}
