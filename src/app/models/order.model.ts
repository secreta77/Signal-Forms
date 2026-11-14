export type Order = {
  id: string
  status: string | null
  customerName: string | null
  itemCount: number
  total: number
  createdAt: string
  assignedWaiter: string | null
}

export type OrderQueueResponse = {
  serverTime: string
  orders: Order[] | null
}
