import MainLayoutAuthenticated from '../../components/MainLayoutAuthenticated';
import redirect from 'nextjs-redirect'; 

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id
    }
  }
}

export default function Index({id}) {
  const PaginatedRedirect = redirect(`/conversation/null/null/${id}`, {
    statusCode: 200,
  })
  return (<MainLayoutAuthenticated>
    <PaginatedRedirect/>
  </MainLayoutAuthenticated>);
}

