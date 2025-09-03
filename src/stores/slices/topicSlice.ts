import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Topic from "../../interfaces/Topic";
import { configHeaderPublic } from "../../utils/config";
import axios from "axios";
import TopicDetail from "../../interfaces/TopicDetail";
import WordDetail from "../../interfaces/WordDetail";

export interface TopicState {
    listTopic: Topic[];
    listTopicDetail: TopicDetail[];
    listTopicByPage: Topic[];
    listWordDetail: WordDetail[];
    isLoading: boolean;
}

const initialState: TopicState = {
    listTopic: [],
    listTopicDetail: [],
    listTopicByPage: [],
    isLoading: false,
    listWordDetail: [],
}

export const fetchTopicList = createAsyncThunk(
    'fetchTopicList',
    async () => {
        const config = configHeaderPublic('get', '/topic');
        const response = await axios(config);
        return response.data;
    }
)

export const fetchTopicDetailList = createAsyncThunk(
    'fetchTopicDetailList',
    async (topicCardID: string) => {
        const config = configHeaderPublic('get', `/topic/detail/${topicCardID}`);
        const response = await axios(config);
        return response.data;
    }
)

// fetch word details by topicDetailID (new backend API)
export const fetchWordDetailList = createAsyncThunk(
    'fetchWordDetailList',
    async (topicDetailID: string) => {
        const config = configHeaderPublic('get', `/topic/word-detail/${topicDetailID}`);
        const response = await axios(config);
        return response.data;
    }
)

// add new Topic
export const addNewTopic = createAsyncThunk(
    'addNewTopic',
    async ({ name, numberOfWords, createdBy, userID }: { name: string; numberOfWords: number; createdBy: 'admin'|'user'; userID?: string }) => {
        const body = userID ? { name, numberOfWords, userID, createdBy } : { name, numberOfWords, createdBy }
        const config = configHeaderPublic('post', '/topic/add', body);
        const response = await axios(config);
        return response.data;
    }
)

// add new Topic Detail
export const addNewTopicDetail = createAsyncThunk(
    'addNewTopicDetail',
    async ({ topicCardID, name, image }: { topicCardID: string; name: string; image: string }) => {
        const config = configHeaderPublic('post', '/topic/detail/add', { topicCardID, name, image });
        const response = await axios(config);
        return response.data;
    }
)

// add new Word Detail (posts one per topicDetailID)
export const addNewWordDetail = createAsyncThunk(
    'addNewWordDetail',
    async ({ topicDetailIDs, text, image, type, meaning, examples, pronunciation }: {
        topicDetailIDs: string[];
        text: string;
        image: string;
        type: string;
        meaning: string;
        examples: string[];
        pronunciation: string;
    }) => {
        const results = await Promise.all(
            topicDetailIDs.map(async (topicDetailID) => {
                const payload = { topicDetailID, text, pronunciation, image, meaning, examples, type };
                const config = configHeaderPublic('post', '/topic/word-detail/add', payload);
                const response = await axios(config);
                return response.data;
            })
        );
        return results;
    }
)

export const topicSlice = createSlice({
    name: 'topic', 
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetchTopicList
        builder.addCase(fetchTopicList.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(fetchTopicList.fulfilled, (state, action) => {
            let tempList = action.payload.map((data: any) => ({
                id: data._id,
                name: data.name,
                numberOfWords: Array.isArray(data.words) ? data.words.length : Number(data.words ?? 0),
                userID: data.userID,
            }))
            state.listTopic = tempList;
            state.isLoading = false;
        }),
        builder.addCase(fetchTopicList.rejected, (state, action) => {
            console.log('fetch Error', state, action);
            state.isLoading = false;
        }),

        // fetchTopicDetailList
        builder.addCase(fetchTopicDetailList.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(fetchTopicDetailList.fulfilled, (state, action) => {
            let tempList = action.payload.map((data: any) => ({
                id: data._id,
                topicCardID: data.topicCardID,
                name: data.name,
                image: data.image,
            }))
            state.listTopicDetail = tempList;
            state.isLoading = false;
        }),
        builder.addCase(fetchTopicDetailList.rejected, (state, action) => {
            console.log('fetch Error', state, action);
            state.isLoading = false;
        }),

        // fetchWordDetailList
        builder.addCase(fetchWordDetailList.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(fetchWordDetailList.fulfilled, (state, action) => {
            let tempList: WordDetail[] = action.payload.map((word: any) => ({
                id: word._id,
                topicDetailIDs: Array.isArray(word.topicDetailIDs) ? word.topicDetailIDs : (word.topicDetailID ? [word.topicDetailID] : []),
                text: word.text,
                image: word.image,
                type: word.type,
                meaning: word.meaning,
                examples: word.examples,
                pronunciation: word.pronunciation,
            }))
            state.listWordDetail = tempList;
            state.isLoading = false;
        }),
        builder.addCase(fetchWordDetailList.rejected, (state, action) => {
            console.log('fetch Error', state, action);
            state.isLoading = false;
        }),

        // addNewTopic
        builder.addCase(addNewTopic.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(addNewTopic.fulfilled, (state, action) => {
            const data = action.payload;
            const newTopic: Topic = {
                id: data._id,
                name: data.name,
                numberOfWords: Array.isArray(data.words) ? data.words.length : Number(data.words ?? 0),
                userID: data.userID,
                createdBy: data.createdBy
            }
            state.listTopic = [newTopic, ...state.listTopic];
            state.isLoading = false;
        }),
        builder.addCase(addNewTopic.rejected, (state, action) => {
            console.log('addNewTopic error', action);
            state.isLoading = false;
        }),

        // addNewTopicDetail
        builder.addCase(addNewTopicDetail.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(addNewTopicDetail.fulfilled, (state, action) => {
            const data = action.payload;
            const newDetail: TopicDetail = {
                id: data._id,
                topicCardID: data.topicCardID,
                name: data.name,
                image: data.image,
            }
            state.listTopicDetail = [newDetail, ...state.listTopicDetail];
            state.isLoading = false;
        }),
        builder.addCase(addNewTopicDetail.rejected, (state, action) => {
            console.log('addNewTopicDetail error', action);
            state.isLoading = false;
        }),

        // addNewWordDetail
        builder.addCase(addNewWordDetail.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(addNewWordDetail.fulfilled, (state, action) => {
            const created = action.payload as any[];
            const mapped: WordDetail[] = created.map((word: any) => ({
                id: word._id,
                topicDetailIDs: Array.isArray(word.topicDetailIDs) ? word.topicDetailIDs : (word.topicDetailID ? [word.topicDetailID] : []),
                text: word.text,
                image: word.image,
                type: word.type,
                meaning: word.meaning,
                examples: word.examples,
                pronunciation: word.pronunciation,
            }));
            state.listWordDetail = [...mapped, ...state.listWordDetail];
            state.isLoading = false;
        }),
        builder.addCase(addNewWordDetail.rejected, (state, action) => {
            console.log('addNewWordDetail error', action);
            state.isLoading = false;
        })
    }
})

export const { } = topicSlice.actions;

export default topicSlice.reducer;