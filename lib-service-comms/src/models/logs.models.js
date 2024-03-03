'use strict';

const logsModel = (mongoose) => {
    // Logs Schema
    const logSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            message: {
                type: String,
                required: true
            },
            level: {
                type: String,
                enum: ['info', 'error'],
                required: true
            },
            timeStamp: {
                type: Date,
                default: Date.now()
            },
            source: {
                type: String,
                required: true
            },
            requestData: {
                method: String,
                url: String,
                headers: Object,
                body: Object
            },
            additionalInfo: {
                type: mongoose.Schema.Types.Mixed
            }
        }
    );

    // Logs Model
    const Logs = mongoose.model('Logs', logSchema);
    return Logs
}

export default logsModel;
