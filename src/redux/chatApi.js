import { createApi } from "@reduxjs/toolkit/query/react"

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    connect: builder.query({
      queryFn: () => ({ data: {} }),
      async onCacheEntryAdded(_, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
        await cacheDataLoaded

        const socket = new WebSocket("wss://echo.websocket.org/.ws")

        socket.onmessage = (event) => {
          updateCachedData((draft) => {
            draft.messages.push({ type: "echo", text: event.data })
          })
        }

        socket.onopen = () => {
          updateCachedData((draft) => {
            draft.socket = socket
            draft.messages = []
          })
        }

        await cacheEntryRemoved
        socket.close()
      },
    }),
  }),
})

export const { useConnectQuery } = chatApi
