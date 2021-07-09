import MainLayoutAuthenticated from '../../../components/MainLayoutAuthenticated';
import ConversationDashboard from '../../../components/ConversationDashboard';
import fbripapi from '../../../util/fbripapi'
import redirect from 'nextjs-redirect'
import absoluteUrl from 'next-absolute-url'

export async function getServerSideProps(context) {
  let props = {
    nextTimestamp: null
  };
  const { origin } = absoluteUrl(context.req)
  if (context.params.timestamp) {
    let timestamp = context.params.timestamp
    if (timestamp[0]) {
      props.timestamp = timestamp[0];
    }
    /* if (timestamp[1]) {
      props.prevTimestamp = timestamp[1];
    } */ 
  }
  props.id = context.params.id;

  let conversations = await fbripapi({
    url: `${origin}/api/conversations`,
    method: 'POST', 
    data: { id: context.params.id, timestamp: props.timestamp },
    context
  });
  props.conversations = conversations ? conversations.conversations : []; 
  props.nextTimestamp = conversations ? conversations.timestamp : null; 
  return {
    props
  }
}

export default function Index({conversations, nextTimestamp, prevTimestamp, id}) {
  return (<MainLayoutAuthenticated>
    <ConversationDashboard conversations={conversations} id={id} nextTimestamp={nextTimestamp} prevTimestamp={prevTimestamp}/>
  </MainLayoutAuthenticated>);
}
