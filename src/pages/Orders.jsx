import React from "react";
import { BsSearch } from "react-icons/bs";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { Filter, Sort, Edit, Toolbar, Page } from "@syncfusion/ej2-react-grids";

import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
export default function Orders() {
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Dialog",
  };
  const toolbarOptions = [
   
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "Search",
  ];
  const validationRule = { required: true };
  const orderidRules = { required: true, number: true };
  const filterOptions = { type: "CustomerName" };
 
  let menuFilter = { type: "Menu" };
  let checkboxFilter = { type: "CheckBox" };

  return (
    <>
      <div className="head space-b">
        <h4>Orders</h4>
      </div>
      <section>
        <div className="card scrollY">
          <GridComponent
            dataSource={ordersData}
            width="auto"
            enableAdaptiveUI={true}
            allowFiltering={true}
            allowSorting={true}
            allowPaging={true}
            filterSettings={filterOptions}
            toolbar={toolbarOptions}
            editSettings={editSettings}
           
          
          >
            <ColumnsDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {ordersGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject services={[Filter, Sort, Edit, Toolbar, Page]} />
          </GridComponent>
        </div>
      </section>
    </>
  );
}
