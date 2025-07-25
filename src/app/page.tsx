import { getPortfolioData } from "@/app/utils/getPortfolioData";
import Home from "./home";

export default async function Page() {
  const props = await getPortfolioData();

  return <Home {...props} />;
}
