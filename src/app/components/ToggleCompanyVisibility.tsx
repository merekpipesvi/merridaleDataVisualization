import React from "react";
import { Checkbox, Grid, Group, Text } from "@mantine/core";

type ToggleCompanyVisibilityProps = {
  companyOptions: Array<{ company: string; change: number; amount: number; }>;
  visibleCompanies: Set<string>;
  toggleCompanyVisibility: (company: string) => void;
  toggleAllCompanies: () => void;
};

export const ToggleCompanyVisibility: React.FC<ToggleCompanyVisibilityProps> = ({
  companyOptions,
  visibleCompanies,
  toggleCompanyVisibility,
  toggleAllCompanies,
}) => {
  return (
    <div style={{ marginTop: 20 }}>
      <Group mb="md">
        <Checkbox
          key="toggleAll"
          label="Toggle All Companies"
          checked={visibleCompanies.size > 0}
          onChange={() => toggleAllCompanies()}
          size="xl"
        />
      </Group>
      <Grid gutter="md">
        {companyOptions.map(({ company, change, amount }) => (
          <Grid.Col key={company} span={4}>
            <Text fw={700} pl="3rem" c={amount < 0 ? "red" : "green"}>{amount}</Text>
            <Checkbox
              label={`${company} (${change.toFixed(1)}%)`}
              checked={visibleCompanies.has(company)}
              onChange={() => toggleCompanyVisibility(company)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};
