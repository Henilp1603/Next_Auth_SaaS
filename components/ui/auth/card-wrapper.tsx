"use client";

import { Card, CardContent, CardHeader, CardFooter } from "../card";
import BackBtn from "./back-btn";
import Header from "./header";
import Social from "./social";

interface CradWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backBtnLabel,
  backBtnHref,
  showSocial,
}: CradWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
            <Social/>
        </CardFooter>
      )}
      <CardFooter>
        <BackBtn label={backBtnLabel} href={backBtnHref}></BackBtn>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
