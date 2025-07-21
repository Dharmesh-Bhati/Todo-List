import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addTodos = createAsyncThunk('todos/addtodos',async({title}) => {
  const res = await axios.post('http://localhost:8080/todo',{title})
  return res.data
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async() => {
  const res = await axios.get('http://localhost:8080/todo')
  return res.data
})

export const deleteTodos = createAsyncThunk('/todos/deletetodos', async({id}) => {
  const res = await axios.delete(`http://localhost:8080/todo/${id}`)
  return res.data
})

export const updateTodos = createAsyncThunk('todos/updateTodos',async({id,title}) => {
  const res = await axios.put(`http://localhost:8080/todo/${id}`,{title})
  return res.data
})
export const todoSlice = createSlice({
  name: 'todo',
  initialState:{
    tasks: [],
    loading:false,
    error:null
  },
  extraReducers: (builder) => {
   builder
   
   .addCase(addTodos.pending, (state) => {
    state.loading =true;
   })
   .addCase(addTodos.fulfilled, (state,action) => {
    state.tasks.push(action.payload)
   })
   .addCase(addTodos.rejected, (state,action) => {
    state.loading = false;
    state.error = action.error.message
   })

   .addCase(fetchTodos.pending, (state) => {
    state.loading = true
   })
   .addCase(fetchTodos.fulfilled, (state,action) => {
    state.loading = false;
    state.tasks=action.payload
   })
   .addCase(fetchTodos.rejected, (state,action) => {
    state.loading = false;
    state.error = action.error.message;
   })

   .addCase(deleteTodos.pending, (state) => {
    state.loading = true
   })
   .addCase(deleteTodos.fulfilled, (state,action) => {
    state.loading = false;
    state.tasks= state.tasks.filter((t) => t._id !== action.payload._id )
   })
   .addCase(deleteTodos.rejected, (state,action) => {
    state.loading = false;
    state.error = action.error.message;
   })

   .addCase(updateTodos.pending, (state) => {
    state.loading = true
   })
   .addCase(updateTodos.fulfilled, (state,action) => {
    state.loading = false;
    const existing=state.tasks.find(t=> t._id === action.payload._id)
    if(existing){
      existing.title = action.payload.title;
      existing.completed = action.payload.completed;
    }
   })
   .addCase(updateTodos.rejected, (state,action) => {
    state.loading = false;
    state.error = action.error.message;
   })

  },
})


export default todoSlice.reducer