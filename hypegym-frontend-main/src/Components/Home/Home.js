import { Container, Row } from "react-bootstrap";
import "./style.css";

const HomePage = () => {
  return (
    <div className="home-page ">
      <Container>
        <Row className="align-items-center">
          <h1> {"Get Stronger"} </h1>
          <h3>Watch your gym get hyped with Hypeline Technologies</h3>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
