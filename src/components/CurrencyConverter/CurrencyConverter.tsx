import { useState, useEffect } from "react";

import { Card, Flex, Select, TextField } from "@radix-ui/themes";
import axios from "axios";

import "./CurrencyConverter.css";

interface ICurrenciesPair {
  base: string;
  target: string;
}

function CurrencyConverter() {
  const exchangeRateApiKey = process.env.REACT_APP_API_KEY;
  const DBdata = [
    ["AED", "UAE Dirham"],
    ["AFN", "Afghan Afghani"],
    ["ALL", "Albanian Lek"],
    ["AMD", "Armenian Dram"],
    ["ANG", "Netherlands Antillian Guilder"],
    ["AOA", "Angolan Kwanza"],
    ["ARS", "Argentine Peso"],
    ["AUD", "Australian Dollar"],
    ["AWG", "Aruban Florin"],
    ["AZN", "Azerbaijani Manat"],
    ["BAM", "Bosnia and Herzegovina Convertible Mark"],
    ["BBD", "Barbados Dollar"],
    ["BDT", "Bangladeshi Taka"],
    ["BGN", "Bulgarian Lev"],
    ["BHD", "Bahraini Dinar"],
    ["BIF", "Burundian Franc"],
    ["BMD", "Bermudian Dollar"],
    ["BND", "Brunei Dollar"],
    ["BOB", "Bolivian Boliviano"],
    ["BRL", "Brazilian Real"],
    ["BSD", "Bahamian Dollar"],
    ["BTN", "Bhutanese Ngultrum"],
    ["BWP", "Botswana Pula"],
    ["BYN", "Belarusian Ruble"],
    ["BZD", "Belize Dollar"],
    ["CAD", "Canadian Dollar"],
    ["CDF", "Congolese Franc"],
    ["CHF", "Swiss Franc"],
    ["CLP", "Chilean Peso"],
    ["CNY", "Chinese Renminbi"],
    ["COP", "Colombian Peso"],
    ["CRC", "Costa Rican Colon"],
    ["CUP", "Cuban Peso"],
    ["CVE", "Cape Verdean Escudo"],
    ["CZK", "Czech Koruna"],
    ["DJF", "Djiboutian Franc"],
    ["DKK", "Danish Krone"],
    ["DOP", "Dominican Peso"],
    ["DZD", "Algerian Dinar"],
    ["EGP", "Egyptian Pound"],
    ["ERN", "Eritrean Nakfa"],
    ["ETB", "Ethiopian Birr"],
    ["EUR", "Euro"],
    ["FJD", "Fiji Dollar"],
    ["FKP", "Falkland Islands Pound"],
    ["FOK", "Faroese Kr\u00f3na"],
    ["GBP", "Pound Sterling"],
    ["GEL", "Georgian Lari"],
    ["GGP", "Guernsey Pound"],
    ["GHS", "Ghanaian Cedi"],
    ["GIP", "Gibraltar Pound"],
    ["GMD", "Gambian Dalasi"],
    ["GNF", "Guinean Franc"],
    ["GTQ", "Guatemalan Quetzal"],
    ["GYD", "Guyanese Dollar"],
    ["HKD", "Hong Kong Dollar"],
    ["HNL", "Honduran Lempira"],
    ["HRK", "Croatian Kuna"],
    ["HTG", "Haitian Gourde"],
    ["HUF", "Hungarian Forint"],
    ["IDR", "Indonesian Rupiah"],
    ["ILS", "Israeli New Shekel"],
    ["IMP", "Manx Pound"],
    ["INR", "Indian Rupee"],
    ["IQD", "Iraqi Dinar"],
    ["IRR", "Iranian Rial"],
    ["ISK", "Icelandic Kr\u00f3na"],
    ["JEP", "Jersey Pound"],
    ["JMD", "Jamaican Dollar"],
    ["JOD", "Jordanian Dinar"],
    ["JPY", "Japanese Yen"],
    ["KES", "Kenyan Shilling"],
    ["KGS", "Kyrgyzstani Som"],
    ["KHR", "Cambodian Riel"],
    ["KID", "Kiribati Dollar"],
    ["KMF", "Comorian Franc"],
    ["KRW", "South Korean Won"],
    ["KWD", "Kuwaiti Dinar"],
    ["KYD", "Cayman Islands Dollar"],
    ["KZT", "Kazakhstani Tenge"],
    ["LAK", "Lao Kip"],
    ["LBP", "Lebanese Pound"],
    ["LKR", "Sri Lanka Rupee"],
    ["LRD", "Liberian Dollar"],
    ["LSL", "Lesotho Loti"],
    ["LYD", "Libyan Dinar"],
    ["MAD", "Moroccan Dirham"],
    ["MDL", "Moldovan Leu"],
    ["MGA", "Malagasy Ariary"],
    ["MKD", "Macedonian Denar"],
    ["MMK", "Burmese Kyat"],
    ["MNT", "Mongolian T\u00f6gr\u00f6g"],
    ["MOP", "Macanese Pataca"],
    ["MRU", "Mauritanian Ouguiya"],
    ["MUR", "Mauritian Rupee"],
    ["MVR", "Maldivian Rufiyaa"],
    ["MWK", "Malawian Kwacha"],
    ["MXN", "Mexican Peso"],
    ["MYR", "Malaysian Ringgit"],
    ["MZN", "Mozambican Metical"],
    ["NAD", "Namibian Dollar"],
    ["NGN", "Nigerian Naira"],
    ["NIO", "Nicaraguan C\u00f3rdoba"],
    ["NOK", "Norwegian Krone"],
    ["NPR", "Nepalese Rupee"],
    ["NZD", "New Zealand Dollar"],
    ["OMR", "Omani Rial"],
    ["PAB", "Panamanian Balboa"],
    ["PEN", "Peruvian Sol"],
    ["PGK", "Papua New Guinean Kina"],
    ["PHP", "Philippine Peso"],
    ["PKR", "Pakistani Rupee"],
    ["PLN", "Polish Z\u0142oty"],
    ["PYG", "Paraguayan Guaran\u00ed"],
    ["QAR", "Qatari Riyal"],
    ["RON", "Romanian Leu"],
    ["RSD", "Serbian Dinar"],
    ["RUB", "Russian Ruble"],
    ["RWF", "Rwandan Franc"],
    ["SAR", "Saudi Riyal"],
    ["SBD", "Solomon Islands Dollar"],
    ["SCR", "Seychellois Rupee"],
    ["SDG", "Sudanese Pound"],
    ["SEK", "Swedish Krona"],
    ["SGD", "Singapore Dollar"],
    ["SHP", "Saint Helena Pound"],
    ["SLE", "Sierra Leonean Leone"],
    ["SLL", "Sierra Leonean Leone"],
    ["SOS", "Somali Shilling"],
    ["SRD", "Surinamese Dollar"],
    ["SSP", "South Sudanese Pound"],
    ["STN", "S\u00e3o Tom\u00e9 and Pr\u00edncipe Dobra"],
    ["SYP", "Syrian Pound"],
    ["SZL", "Eswatini Lilangeni"],
    ["THB", "Thai Baht"],
    ["TJS", "Tajikistani Somoni"],
    ["TMT", "Turkmenistan Manat"],
    ["TND", "Tunisian Dinar"],
    ["TOP", "Tongan Pa\u02bbanga"],
    ["TRY", "Turkish Lira"],
    ["TTD", "Trinidad and Tobago Dollar"],
    ["TVD", "Tuvaluan Dollar"],
    ["TWD", "New Taiwan Dollar"],
    ["TZS", "Tanzanian Shilling"],
    ["UAH", "Ukrainian Hryvnia"],
    ["UGX", "Ugandan Shilling"],
    ["USD", "United States Dollar"],
    ["UYU", "Uruguayan Peso"],
    ["UZS", "Uzbekistani So'm"],
    ["VES", "Venezuelan Bol\u00edvar Soberano"],
    ["VND", "Vietnamese \u0110\u1ed3ng"],
    ["VUV", "Vanuatu Vatu"],
    ["WST", "Samoan T\u0101l\u0101"],
    ["XAF", "Central African CFA Franc"],
    ["XCD", "East Caribbean Dollar"],
    ["XDR", "Special Drawing Rights"],
    ["XOF", "West African CFA franc"],
    ["XPF", "CFP Franc"],
    ["YER", "Yemeni Rial"],
    ["ZAR", "South African Rand"],
    ["ZMW", "Zambian Kwacha"],
    ["ZWL", "Zimbabwean Dollar"],
  ];
  const [currenciesList, setCurrenciesList] = useState<string[][]>(DBdata);
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState<string>("");
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState<string>("");

  const [currenciesPair, setCurrenciesPair] = useState<ICurrenciesPair>({
    base: "USD",
    target: "UAH",
  });
  const [currenciesPairRate, setCurrenciesPairRate] = useState<number>(0);

  // load list of all avaliable currencies
  // useEffect(()=> {
  //   axios.get(`/exchangerate-api/v6/${exchangeRateApiKey}/codes`)
  //   .then(response => {
  //     console.log(response.data.supported_codes);
  //     setCurrenciesList(response.data.supported_codes)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }, [])

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

      const convertedValue = inputValue
        ? (
            parseFloat(inputValue.replace(",", ".")) * currenciesPairRate
          ).toFixed(2)
        : "";
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
    console.log(response);

    const convertedValue = (
      parseFloat(baseCurrencyAmount.replace(",", ".")) * response
    ).toFixed(2);

    setTargetCurrencyAmount(convertedValue);
  }

  async function onSelectTargetCurrency(code: string) {
    setCurrenciesPair({ ...currenciesPair, target: code });

    const response = await getCurrenciesPairRate(currenciesPair.base, code);

    setCurrenciesPairRate(response);
    console.log(response);
    const convertedValue = (
      parseFloat(baseCurrencyAmount.replace(",", ".")) * response
    ).toFixed(2);

    setTargetCurrencyAmount(convertedValue);
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
          <Flex gap="3" justify="center">
            <TextField.Root
              onChange={baseCurrencyHandler}
              value={baseCurrencyAmount}
              radius="large"
              placeholder="Search the docs…"
            />
            <Select.Root
              onValueChange={onSelectBaseCurrency}
              defaultValue="USD"
            >
              <Select.Trigger placeholder="" />
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
          <Flex gap="3" justify="center">
            <TextField.Root
              onChange={targetCurrencyHandler}
              value={targetCurrencyAmount}
              radius="large"
              placeholder="Search the docs…"
            />
            <Select.Root
              onValueChange={onSelectTargetCurrency}
              defaultValue="UAH"
            >
              <Select.Trigger placeholder="" />
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
        </Card>
      </div>
    </div>
  );
}

export default CurrencyConverter;
