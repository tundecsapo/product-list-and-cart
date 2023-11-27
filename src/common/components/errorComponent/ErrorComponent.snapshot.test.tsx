import renderer from "react-test-renderer";
import { ErrorComponent } from "./ErrorComponent";

it("renders correctly", () => {
  const tree = renderer.create(<ErrorComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
