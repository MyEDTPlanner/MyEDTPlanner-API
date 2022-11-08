const Group = require('../models/group')
const handleMongoDBErrors = require('../utils/handleMongoDBErrors')

const getGroups = async (query) => {
    let response = {
        success: true,
    }

    let search = {}

    if (query._id !== undefined) {
        search._id = query._id
    }

    try {
        const groups = await Group.find(search)

        response = { ...response, groups }
    } catch (error) {
        response = {
            ...response,
            success: false,
            error: handleMongoDBErrors(error),
        }
    }

    return response
}

const createGroup = async (groupData) => {
    let response = {
        success: true,
    };

    // TODO: Voir les acccès

    const { start, end, title, type, description, locations, attendee, groups, done, presential } = groupData;

    const group = new Group({
        start,
        end,
        title,
        type,
        description,
        locations,
        attendee,
        groups,
        done,
        presential
    });

    //Insertion dans la base de donnée
    try {
        const savedGroup = await group.save();

        response = { ...response, group: savedGroup };
    } catch (error) {
        response = {
            ...response,
            success: false,
            error: handleMongoDBErrors(error),
        };
    }

    return response
}

const updateGroup = async (_id, groupData) => {
    let response = {
        success: true,
    }

    // TODO: Voir les acccès

    //Insertion dans la base de donnée
    try {
        const savedGroup = await Group.findOneAndUpdate(
            { _id },
            { $set: { ...groupData } },
            { new: true },
        )

        response = { ...response, group: savedGroup }
    } catch (error) {
        response = {
            ...response,
            success: false,
            error: handleMongoDBErrors(error),
        }
    }

    return response
}

const deleteGroup = async (_id) => {
    let response = {
        success: true,
    }

    // TODO: Voir les acccès

    try {
        const deletedGroup = await Group.findByIdAndDelete(_id)

        response = { ...response, group: deletedGroup }
    } catch (error) {
        response = {
            ...response,
            success: false,
            error: handleMongoDBErrors(error),
        }
    }
    return response
}

module.exports = {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup,
}