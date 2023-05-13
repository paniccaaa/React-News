import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { NewsResponse } from '../../@types/allTypes';
import axios from 'axios';

type ParamsType = {
  country: string;
  searchValue: string;
  category: string;
  pageValue: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const fetchNews = createAsyncThunk('news/fetchNews', async (params: ParamsType) => {
  const { country, searchValue, category, pageValue,  } = params;
  const { data } = await axios.get<NewsResponse>(
    `https://newsapi.org/v2/top-headlines?pageSize=${pageValue}&q=${searchValue}&country=${country}&category=${category}&apiKey=8a4944aaab22452f85a7072a800309f3`,

    );
  return data;
});

interface NewsSliceState {
  searchValue: string;
  category: string;
  country: string;
  pageValue: number;
  news: NewsResponse;
  status: string;
}

const initialState: NewsSliceState = {
  searchValue: '',
  pageValue: 100,
  status: Status.LOADING,
  category: 'general',
  country: 'us',
  news: {
    status: '',
    totalResults: 0,
    articles: [
      {
        source: {
          id: null,
          name: '',
        },
        author: '',
        title: '',
        description: '',
        url: '',
        urlToImage: '',
        publishedAt: '',
        content: '',
      },
    ],
  },
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state: NewsSliceState) => {
      state.status = Status.LOADING;
    });
    builder.addCase(
      fetchNews.fulfilled,
      (state: NewsSliceState, action: PayloadAction<NewsResponse>) => {
        state.status = Status.SUCCESS;
        state.news = action.payload;
      },
    );
    builder.addCase(fetchNews.rejected, (state) => {
      state.status = Status.ERROR;
      console.log('ошибка в получении новостей');
    });
  },
});

export const selectNews = (state: RootState) => state.news;
export const { setSearchValue, setCategory, setCountry } = newsSlice.actions;
export default newsSlice.reducer;
