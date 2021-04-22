import React from 'react';
import { ActionsTypes, PostsType, ProfilePageType } from './store';

// for profile

export type AddPostActionType = ReturnType<typeof AddPostAC>
export type UpdatePostActionType = ReturnType<typeof UpdatePostAC>

export const AddPostAC = () => {
    return {
        type: 'ADD-POST',
    } as const
}
export const UpdatePostAC = (newText: string) => {
    return {
        type: 'UPDATE-POST-TEXT',
        newText: newText,
    } as const
}
const ADD_POST = "ADD-POST"
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT"

const initialState = {
    posts: [
        { id: 1, message: 'Love, awareness and full invetment !', like: 35 },
        {
            id: 2,
            message:
                "What you are is God's gift to you, what you'll become is your gift to God.",
            like: 5535,
        },
        { id: 3, message: 'true love is never giving up!', like: 55 },
    ],
    newPostText: '',
}

export const profilePageReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: state.newPostText,
                like: 0
            };
            state.posts = [newPost].concat(state.posts) // [объект]добавляется в начало массива
            // state.posts.push(newPost); просто добавляет (пушит) объект в массив
            state.newPostText = "";
            return state;
        case UPDATE_POST_TEXT:
            state.newPostText = action.newText;
            return state
        default:
            return state
    }
}