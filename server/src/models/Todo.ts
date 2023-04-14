import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

class Todo {
    @prop({ type: String })
    title: string

    @prop({ type: String })
    description: string

    @prop({ type: Boolean, default: false })
    done: boolean
}

export default getModelForClass(Todo);