import renderer from "react-test-renderer";
import { Loader } from "./Loader";

it("renders correctly", () => {
  const tree = renderer.create(<Loader text="Test text" />).toJSON();
  expect(tree).toMatchSnapshot();
});
