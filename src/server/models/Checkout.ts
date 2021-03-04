import mongoose, { Schema, Document } from 'mongoose';
import { UserInterface } from './User';
import { CourseInterface } from './Course';

export interface CheckoutInterface extends Document {
    student?: UserInterface['_id'];
    course?: CourseInterface['_id'];
    email?: string;
    stripe?: string;
}

const CheckoutSchema: Schema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        stripe: {
            type: String,
            require: true,
        },
    },
    { timestamps: { createdAt: 'created_at' } }
);

export default mongoose.model<CheckoutInterface>('checkout', CheckoutSchema);
