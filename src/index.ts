import {app} from './app'
import {AddressInfo} from 'net'

app.set('port', process.env.PORT || 5000);
app.set('hostname', process.env.HOSTNAME || '0.0.0.0');

const server = app.listen(app.get('port'), app.get('hostname'), () => {
    const {port, address} = server.address() as AddressInfo;
    console.log('Server listening on:','http://' + address + ':'+port);
});
