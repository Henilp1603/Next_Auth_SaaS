import { Card, CardFooter, CardHeader } from "../card"
import BackBtn from "./back-btn"
import Header from "./header"

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
        <CardHeader>
            <Header label="Oops! Something want wrong."/>
        </CardHeader>
        <CardFooter>
            <BackBtn label="Back to Login" href="/auth/login"></BackBtn>
        </CardFooter>
    </Card>
  )
}

export default ErrorCard