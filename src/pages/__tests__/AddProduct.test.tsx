import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddProduct from "../addProduct";

test("submits the form with valid data", async () => {
  render(<AddProduct />);

  await userEvent.type(screen.getByLabelText(/Product Name/i), "Test Product");
  await userEvent.type(screen.getByLabelText(/Category/i), "Category 1");

  //Test to simulate form submission
  userEvent.click(screen.getByText(/Create Product/i));

  // Assert expected outcome
});
