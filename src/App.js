import React, {Component} from 'react';
import AutoTable from './containers/AutoTable';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Автомобииииль!</h1>
                </header>
                <AutoTable />
            </div>
        );
    }
}

export default App;
