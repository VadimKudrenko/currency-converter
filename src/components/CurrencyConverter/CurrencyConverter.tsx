import { useState, useEffect } from "react";

import { Card, Flex, Text, Select, TextField } from "@radix-ui/themes";
import axios from "axios";

import "./CurrencyConverter.css";

interface ICurrenciesPair {
  base: string;
  target: string;
}

function CurrencyConverter() {
  const exchangeRateApiKey = process.env.REACT_APP_API_KEY;

  const [currenciesList, setCurrenciesList] = useState<string[][]>([]);
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState<string>("");
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState<string>("");

  const [currenciesPair, setCurrenciesPair] = useState<ICurrenciesPair>({
    base: "USD",
    target: "UAH",
  });
  const [currenciesPairRate, setCurrenciesPairRate] = useState<number>(0);

  // load list of all avaliable currencies
  useEffect(() => {
    axios
      .get(`/exchangerate-api/v6/${exchangeRateApiKey}/codes`)
      .then((response) => {
        setCurrenciesList(response.data.supported_codes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // load default currencies pair rate
  useEffect(() => {
    async function getCurrenciesPairRate(
      base: string,
      target: string
    ): Promise<number> {
      const response: number = await axios
        .get(
          `/exchangerate-api/v6/${exchangeRateApiKey}/pair/${base}/${target}`
        )
        .then((response) => {
          setCurrenciesPairRate(response.data?.conversion_rate);
          return response.data?.conversion_rate;
        })
        .catch((error) => {
          console.log(error);
        });
      return response;
    }

    getCurrenciesPairRate(currenciesPair.base, currenciesPair.target);
  }, []);

  function baseCurrencyHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    if (/^\d*([.]\d{0,2})?$/.test(e.target.value)) {
      setBaseCurrencyAmount(inputValue);

      let convertedValue;
      convertedValue === "NaN"
        ? (convertedValue = "")
        : (convertedValue = inputValue
            ? (
                parseFloat(inputValue.replace(",", ".")) * currenciesPairRate
              ).toFixed(2)
            : "");
      setTargetCurrencyAmount(convertedValue);
    }
  }

  function targetCurrencyHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    if (/^\d*([.]\d{0,2})?$/.test(e.target.value)) {
      setTargetCurrencyAmount(inputValue);
      const convertedValue = inputValue
        ? (
            parseFloat(inputValue.replace(",", ".")) / currenciesPairRate
          ).toFixed(2)
        : "";
      setBaseCurrencyAmount(convertedValue);
    }
  }

  async function onSelectBaseCurrency(code: string) {
    setCurrenciesPair({ ...currenciesPair, base: code });
    const response = await getCurrenciesPairRate(code, currenciesPair.target);
    setCurrenciesPairRate(response);

    const convertedValue = (
      parseFloat(baseCurrencyAmount.replace(",", ".")) * response
    ).toFixed(2);
    convertedValue === "NaN"
      ? setTargetCurrencyAmount("")
      : setTargetCurrencyAmount(convertedValue);
  }

  async function onSelectTargetCurrency(code: string) {
    setCurrenciesPair({ ...currenciesPair, target: code });

    const response = await getCurrenciesPairRate(currenciesPair.base, code);

    setCurrenciesPairRate(response);
    const convertedValue = (
      parseFloat(baseCurrencyAmount.replace(",", ".")) * response
    ).toFixed(2);

    convertedValue === "NaN"
      ? setTargetCurrencyAmount("")
      : setTargetCurrencyAmount(convertedValue);
  }

  async function getCurrenciesPairRate(
    base: string,
    target: string
  ): Promise<number> {
    const response: number = await axios
      .get(`/exchangerate-api/v6/${exchangeRateApiKey}/pair/${base}/${target}`)
      .then((response) => {
        return response.data?.conversion_rate;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  return (
    <div className="currency-converter">
      <div className="currency-converter__content-wrapper">
        <Card>
          <Flex direction="column" gapY="3">
            <Text as="div" size="2" weight="bold" align="center">
              Currency Converter
            </Text>
            <Flex gap="3" justify="between">
              <TextField.Root
                className="currency-converter__input"
                onChange={baseCurrencyHandler}
                value={baseCurrencyAmount}
                radius="large"
                placeholder=""
              />
              <Select.Root
                onValueChange={onSelectBaseCurrency}
                defaultValue="USD"
              >
                <Select.Trigger
                  className="currency-converter__select-trigger"
                  placeholder=""
                />
                <Select.Content>
                  <Select.Group>
                    {currenciesList
                      .filter(
                        (item) =>
                          item[0] === "EUR" ||
                          item[0] === "USD" ||
                          item[0] === "UAH"
                      )
                      .map((item, index) => (
                        <Select.Item key={index} value={item[0]}>
                          {item[1]}
                        </Select.Item>
                      ))}
                  </Select.Group>
                  <Select.Separator />
                  <Select.Group>
                    {currenciesList
                      .filter(
                        (item) =>
                          item[0] !== "EUR" &&
                          item[0] !== "USD" &&
                          item[0] !== "UAH"
                      )
                      .map((item, index) => (
                        <Select.Item key={index} value={item[0]}>
                          {item[1]}
                        </Select.Item>
                      ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
            <Flex gap="3" justify="between">
              <TextField.Root
                className="currency-converter__input"
                onChange={targetCurrencyHandler}
                value={targetCurrencyAmount}
                radius="large"
                placeholder=""
              />
              <Select.Root
                onValueChange={onSelectTargetCurrency}
                defaultValue="UAH"
              >
                <Select.Trigger
                  className="currency-converter__select-trigger"
                  placeholder=""
                />
                <Select.Content>
                  <Select.Group>
                    {currenciesList
                      .filter(
                        (item) =>
                          item[0] === "EUR" ||
                          item[0] === "USD" ||
                          item[0] === "UAH"
                      )
                      .map((item, index) => (
                        <Select.Item key={index} value={item[0]}>
                          {item[1]}
                        </Select.Item>
                      ))}
                  </Select.Group>
                  <Select.Separator />
                  <Select.Group>
                    {currenciesList
                      .filter(
                        (item) =>
                          item[0] !== "EUR" &&
                          item[0] !== "USD" &&
                          item[0] !== "UAH"
                      )
                      .map((item, index) => (
                        <Select.Item key={index} value={item[0]}>
                          {item[1]}
                        </Select.Item>
                      ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Flex>
        </Card>
      </div>
    </div>
  );
}

export default CurrencyConverter;
