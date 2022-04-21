import Loadable from 'react-loadable'
import Hold from '../page/Hold'
export default function LoadPage(loader, loading = Hold, delay = 3000) {
    return Loadable({
        loader,
        loading,
        delay
    });
}