import MainLayoutAuthenticated from '../components/MainLayoutAuthenticated';
import MainInterfaceForm from '../components/MainInterfaceForm';

export default function Index({conversations}) {
  return (<MainLayoutAuthenticated>
    <MainInterfaceForm/>
  </MainLayoutAuthenticated>);
}
