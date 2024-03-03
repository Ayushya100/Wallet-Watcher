'use strict';

const metadataModel = (mongoose) => {
    // Metadata Schema
    const metadataSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            type: {
                type: String,
                required: true
            },
            header: {
                type: String,
                required: true
            },
            values: {
                type: String,
                required: true
            },
            createdOn: {
                type: Date,
                required: true,
                default: Date.now()
            },
            createdBy: {
                type: String,
                default: 'SYSTEM',
                required: false,
                trim: true
            },
            modifiedOn: {
                type: Date,
                required: true,
                default: Date.now()
            },
            modifiedBy: {
                type: String,
                default: 'SYSTEM',
                required: false,
                trim: true
            },
            isDeleted: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    );

    // Metadata Model
    const Metadata = mongoose.model('Metadata', metadataSchema);
    return Metadata;
}

export default metadataModel;
