const Event = require('../models/event')
const handleMongoDBErrors = require('../utils/handleMongoDBErrors')

const getEvents = async (query) => {
    let response = {
        success: true,
    }

    let search = {}

    if (query._id !== undefined) {
        search._id = query._id
    }

    try {
        const events = await Event.find(search)

        response = { ...response, events }
    } catch (error) {
        response = {
            ...response,
            success: false,
            error: handleMongoDBErrors(error),
        }
    }

    return response
}

const createEvent = async (eventData) => {
    let response = {
        success: true,
    };

    // TODO: Voir les acccès

    const { start, end, title, type, description, locations, attendee, groups, done, presential } = eventData;

    const event = new Event({
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
        const savedEvent = await event.save();

        response = { ...response, event: savedEvent };
    } catch (error) {
        response = {
            ...response,
            success: false,
            error: handleMongoDBErrors(error),
        };
    }

    return response
}

const updateEvent = async (_id, eventData) => {
    let response = {
        success: true,
    }

    // TODO: Voir les acccès

    //Insertion dans la base de donnée
    try {
        const savedEvent = await Event.findOneAndUpdate(
            { _id },
            { $set: { ...eventData } },
            { new: true },
        )

        response = { ...response, event: savedEvent }
    } catch (error) {
        response = {
            ...response,
            success: false,
            error: handleMongoDBErrors(error),
        }
    }

    return response
}

const deleteEvent = async (_id) => {
    let response = {
        success: true,
    }

    // TODO: Voir les acccès

    try {
        const deletedEvent = await Event.findByIdAndDelete(_id)

        response = { ...response, event: deletedEvent }
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
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}