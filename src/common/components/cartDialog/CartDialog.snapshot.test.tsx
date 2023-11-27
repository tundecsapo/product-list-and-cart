import renderer from "react-test-renderer";
import { baseProduct } from "../../utils/testUtil";
import { CartDialogCard } from "./CartDialogCard";

it("renders correctly", () => {
  const tree = renderer.create(<CartDialogCard item={baseProduct} />).toJSON();
  expect(tree).toMatchSnapshot();
});
