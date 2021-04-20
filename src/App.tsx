import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Menu, Container, Header} from "semantic-ui-react";
import {Router} from "./Arch/Router";

function App() {
  return (
      <div>
          <Menu fixed='top' inverted>
              <Container>
                  <Menu.Item as='a' header>
                      Task Manager
                  </Menu.Item>
                  <Menu.Item as='a'>Tasks</Menu.Item>
              </Container>
          </Menu>

          <Container style={{ marginTop: '5em' }}>
              <Header as='h1'>Tasks</Header>
              <Router />
          </Container>
      </div>
  );
}

export default App;
