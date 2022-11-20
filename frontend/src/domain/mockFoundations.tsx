import { foundationApi } from "./api"


export const mockFoundations = async () => {
    await foundationApi.set([
        {
            _id: "505ef191-5227-48cc-81b5-0230e7e9db56",
            name: "Polski Czerwony Krzyż",
            moneySpent: 0,
        },
        {
            _id: "543aeede-9497-43db-83a0-39fd9d165d1d",
            name: "Caritas",
            moneySpent: 0,
        },
        {
            _id: "5944dfdf-a424-42c3-9f97-088ab705a405",
            name: "WOŚP",
            moneySpent: 0,
        },
    ])
}
