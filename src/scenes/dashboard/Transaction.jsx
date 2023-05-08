import {
  Card,
  List,
  ListItem,
  Icon,
  Text,
  Bold,
  Flex,
  Title,
  Footer,
  ButtonInline,
  // Color,
  Block,
  ColGrid,
} from "@tremor/react";

import {
  BriefcaseIcon,
  DesktopComputerIcon,
  ShieldExclamationIcon,
  ShoppingBagIcon,
  ArrowNarrowRightIcon,
  LightningBoltIcon,
  HomeIcon,
  TruckIcon,
} from "@heroicons/react/solid";

const march = [
  {
    name: "Groceries",
    icon: ShoppingBagIcon,
    color: "sky",
    numTransactions: 24,
    amount: "$ 230",
  },
  {
    name: "IT & Office",
    icon: DesktopComputerIcon,
    color: "orange",
    numTransactions: 4,
    amount: "$ 990",
  },
  {
    name: "Travel",
    icon: BriefcaseIcon,
    color: "pink",
    numTransactions: 11,
    amount: "$ 2,345",
  },
  {
    name: "Insurance",
    icon: ShieldExclamationIcon,
    color: "emerald",
    numTransactions: 2,
    amount: "$ 1,450",
  },
];

const april = [
  {
    name: "Food",
    icon: ShoppingBagIcon,
    color: "teal",
    numTransactions: 32,
    amount: "$ 490",
  },
  {
    name: "Travel",
    icon: BriefcaseIcon,
    color: "pink",
    numTransactions: 3,
    amount: "$ 678",
  },
  {
    name: "IT & Office",
    icon: DesktopComputerIcon,
    color: "orange",
    numTransactions: 2,
    amount: "$ 120",
  },
  {
    name: "Transport",
    icon: TruckIcon,
    color: "indigo",
    numTransactions: 12,
    amount: "$ 560",
  },
];

const may = [
  {
    name: "Sports",
    icon: LightningBoltIcon,
    color: "rose",
    numTransactions: 89,
    amount: "$ 2,300.90",
  },
  {
    name: "Groceries",
    icon: ShoppingBagIcon,
    color: "emerald",
    numTransactions: 9,
    amount: "$ 1,087",
  },
  {
    name: "Travel",
    icon: BriefcaseIcon,
    color: "pink",
    numTransactions: 19,
    amount: "$ 1,030",
  },
  {
    name: "Restaurants",
    icon: HomeIcon,
    color: "amber",
    numTransactions: 8,
    amount: "$ 129",
  },
];

const months = [
  {
    name: "March 2022",
    data: march,
  },
  {
    name: "April 2022",
    data: april,
  },
  {
    name: "May 2022",
    data: may,
  },
];

export default function Transaction() {
  return (
    <ColGrid numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
      {months.map((item) => (
        <Card key={item.name}>
          <Title>Transaction Volume</Title>
          <Text>{item.name}</Text>
          <List marginTop="mt-4">
            {item.data.map((transaction) => (
              <ListItem key={transaction.data}>
                <Flex
                  justifyContent="justify-start"
                  spaceX="space-x-4"
                  truncate={true}
                >
                  <Icon
                    variant="light"
                    icon={transaction.icon}
                    size="md"
                    color={transaction.color}
                  />
                  <Block truncate={true}>
                    <Text truncate={true}>
                      <Bold>{transaction.name}</Bold>
                    </Text>
                    <Text
                      truncate={true}
                    >{`${transaction.numTransactions} transactions`}</Text>
                  </Block>
                </Flex>
                <Text>{transaction.amount}</Text>
              </ListItem>
            ))}
          </List>
          <Footer>
            <ButtonInline
              size="sm"
              text="View details"
              icon={ArrowNarrowRightIcon}
              iconPosition="right"
            />
          </Footer>
        </Card>
      ))}
    </ColGrid>
  );
}
