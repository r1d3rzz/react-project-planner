import { Toaster } from "react-hot-toast";
import Container from "../../../components/Container";
import ProjectPage from "../../Project/pages/ProjectPage";

const DashboardPage = () => {
  return (
    <Container>
      <ProjectPage />
      <Toaster />
    </Container>
  );
};

export default DashboardPage;
