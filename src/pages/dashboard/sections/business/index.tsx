import { useEffect } from "react";
import { Table } from "../../../../components/table";
import { Button } from "../../../../components/button";
import { useModal } from "../../../../features/modal";
import { RowActions } from "./RowActions";
import { useBusinessApi } from "../../../../features/business/api";

export const SectionBusiness = () => {
  const { getAll } = useBusinessApi();

  const { pushModal } = useModal();

  const onRefresh = () =>  getAll.fetch(undefined);

  useEffect(() => {
    onRefresh()
  }, []);

  return (
    <div>
      <div className="flex w-full">
        <Button
          label="Nuevo"
          onClick={() =>
            pushModal("BusinessNew", {
              onAfterSuccess: onRefresh,
            })
          }
          className="ml-auto"
        />
      </div>
      <Table
        heads={[null, "Nombre", "Category", "Fecha de Creación"]}
        getRowProps={(rowData) => {
          const { name, category, createdAt } = rowData;

          return {
            nodes: [
              <RowActions rowData={rowData} onRefresh={onRefresh}/>,
              name,
              category,
              createdAt,
            ],
          };
        }}
        data={getAll.data}
      />
    </div>
  );
};