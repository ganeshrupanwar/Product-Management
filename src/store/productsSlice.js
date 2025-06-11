// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../services/api";

// export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
//   const resp = await api.get("/products");
//   return resp.data.products;
// });

// export const addProduct = createAsyncThunk("products/add", async (product) => {
//   const resp = await api.post("/products/add", product);
//   return resp.data;
// });

// export const updateProduct = createAsyncThunk(
//   "products/update",
//   async ({ id, updates }) => {
//     const resp = await api.put(`/products/${id}`, updates);
//     return resp.data;
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "products/delete",
//   async (id) => {
//     await api.delete(`/products/${id}`);
//     return id;
//   }
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState: { items: [], status: "idle", error: null },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (s) => { s.status = "loading"; })
//       .addCase(fetchProducts.fulfilled, (s, a) => {
//         s.status = "succeeded";
//         s.items = a.payload;
//       })
//       .addCase(fetchProducts.rejected, (s, a) => {
//         s.status = "failed";
//         s.error = a.error.message;
//       })
//       .addCase(addProduct.fulfilled, (s, a) => {
//         s.items.push(a.payload);
//       })
//       .addCase(updateProduct.fulfilled, (s, a) => {
//         const idx = s.items.findIndex((p) => p.id === a.payload.id);
//         if (idx !== -1) s.items[idx] = a.payload;
//       })
//       .addCase(deleteProduct.fulfilled, (s, a) => {
//         s.items = s.items.filter((p) => p.id !== a.payload);
//       });
//   },
// });

// export default productsSlice.reducer;



// src/store/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const resp = await api.get("/products");
    return resp.data.products;
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/add",
  async (product) => {
    const resp = await api.post("/products/add", product);
    return resp.data;
  }
);

// Update an existing product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, updates }) => {
    // Use PATCH to simulate a partial update :contentReference[oaicite:0]{index=0}
    const resp = await api.patch(`/products/${id}`, updates);
    return resp.data;
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id) => {
    await api.delete(`/products/${id}`);
    return id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((p) => p.id === updated.id);
        if (idx !== -1) {
          state.items[idx] = updated;
        }
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
