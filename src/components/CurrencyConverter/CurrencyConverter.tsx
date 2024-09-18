import React from "react";

import { Card, Flex, Select } from "@radix-ui/themes";

import './CurrencyConverter.css'

function CurrencyConverter() {
  return (
    <div className="currency-converter">
      <div className="currency-converter__content-wrapper">
        <Card>
          <Flex gap="3" justify="center">
            <input className="currency-converter__counter" type="number"></input>
            <Select.Root
              size="2"
              onValueChange={(currency) => console.log(currency)}
              defaultValue="USD"
            >
              <Select.Trigger placeholder="" />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="EUR">EUR</Select.Item>
                  <Select.Item value="USD">USD</Select.Item>
                  <Select.Item value="UAH">UAH</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group>
                  <Select.Item value="carrot">Carrot</Select.Item>
                  <Select.Item value="potato">Potato</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>
          <Flex gap="3" justify="center">
            <input className="currency-converter__counter" type="number"></input>

            <Select.Root defaultValue="UAH">
              <Select.Trigger placeholder="" />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="EUR">EUR</Select.Item>
                  <Select.Item value="USD">USD</Select.Item>
                  <Select.Item value="UAH">UAH</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group>
                  <Select.Item value="carrot">Carrot</Select.Item>
                  <Select.Item value="potato">Potato</Select.Item>
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
