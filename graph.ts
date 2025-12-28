// import { ApolloClient, InMemoryCache } from "@apollo/client"

// export const client = new ApolloClient({
//   uri: "https://api.exemplo.com/graphql",
//   cache: new InMemoryCache(),
//   headers: {
//     Authorization: 'Bearer Token'
//   }
// })

// // conectando no app

// import { ApolloProvider } from "@apollo/client"
// import { client } from "./apollo"

// function App() {
//   return (
//     <ApolloProvider>
//       <Home />
//     </ApolloProvider>
//   )
// }
// // home
// import { gql, useQuery } from "@apollo/client"

// const GET_USER = gql`
//   query GetUser {
//     user(id: 1) {
//       id
//       name
//       email
//     }
//   }
// `
// function Home() {
//   const { data, loading, error } = useQuery(GET_USER);

//   if (loading) return "Carregando...";
//   if (error) return "Erro 😢";

//   return <div>{data.user.name}</div>;
// }

// const CREATE_USER = gql`
//   mutation CraeteUser($input: UserInput!) {
//     createUser(input: $input) {
//       id
//       name
//     }
//   }
// `

// const [createUser]  = useMutation(CREATE_USER)

// createUser({
//   variables:{
//     input: {
//       name: 'rodrigo',
//       email: 'rodrigo@email.com'
//     }
//   }
// })
