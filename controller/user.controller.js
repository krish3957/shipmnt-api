const user = require("../models/user");

const createDraft = async (req, res) => {
    const { title, description, content, category, keywords, privacy, ownerId, manager, status, thumbnail } = await req.body;
    console.log('Content', content);
    try {
        const newDraft = new draft({
            title,
            description,
            category,
            keywords,
            privacy,
            content,
            owner: ownerId,
            manager,
            status,
            thumbnail
        });
        await newDraft.save();
        const draftOwner = await owner.findById(ownerId);
        //Increase manager total Drafts by 1
        const draftManager = await Manager.findById(manager);
        draftManager.totalDrafts += 1;
        await draftManager.save();



        return res.status(201).json(newDraft);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createDraft
}