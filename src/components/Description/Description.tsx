import React from "react";
import { Container, Box, Card, Text, Link } from "@radix-ui/themes";

function Description() {
  return (
    <Container size="4">
      <Box maxWidth="350px">
        <Card>
          <Text as="div" size="2" weight="bold">
            Currency Converter application
            <br />
            <br />
          </Text>
          <Text as="div" color="gray" size="2">
            Technologies stack:{" "}
            <Text as="span" size="2" weight="bold">
              Typescript, React <br />
              <br />
            </Text>
          </Text>
          <Text as="div" color="gray" size="2">
            Application use&nbsp;
            <Link href="https://api.privatbank.ua/#p24/exchange">
              Privatbank (Ukraine's bank) API
            </Link>&nbsp;
            to display header's pair rates. I use it, becouse this api return
            rates of only the two currency pairs as needed in task (UAH/USD, UAH/EUR).
            <br />
          </Text>
          <Text as="div" color="gray" size="2">
            Also application use&nbsp;
            <Link href="https://www.exchangerate-api.com/">
              ExchangeRate API
            </Link>&nbsp;
            to find of any currencies pair rates and get all available currencies list.
            <br />
            <br />
          </Text>
          <Text as="div" size="2" weight="bold">
            How does it work?
          </Text>
          <Text as="div" color="gray" size="2">
            The first field contains the amount of currency that needs to be converted and the second field will calculate the conversion result.
            <br />
            When currency pairs change, the application will automatically convert the values ​​from the first field to the second.
            <br />
            Default currency pair is USD to UAH.
            <br />
            <br />
          </Text>
          <Text as="div" color="gray" size="2">
            Repository:&nbsp;
            <Link href="https://github.com/VadimKudrenko/currency-converter">
              GitHub link
            </Link>&nbsp;
            <br/>Made by Vadim Kudrenko 
          </Text>
        </Card>
      </Box>
    </Container>
  );
}

export default Description;
