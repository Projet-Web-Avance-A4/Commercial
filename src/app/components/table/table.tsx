import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
import { FaChevronDown, FaMagnifyingGlass, FaCheck } from "react-icons/fa6";
import { propsTable } from "../../interfaces/table";
/* import parse from "html-react-parser"; */

export default function CustomTable ({props, actionButtons} : {props: propsTable, actionButtons: any}) {

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(props.INITIAL_VISIBLE_COLUMNS)
  );
  const [optionFilter, setOptionFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  type Item = (typeof props.items)[0];
  

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return props.columns;

    return props.columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredOrders = [...props.items];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter(function (e) {
        return props.options.search_uid.some(function (a) {
          return e[a].toLowerCase().includes(filterValue.toLowerCase());
        });
      });
    }

    if (
      optionFilter !== "all" &&
      Array.from(optionFilter).length !== props.options.value_option.length
    ) {
      filteredOrders = filteredOrders.filter((items) =>
        Array.from(optionFilter).includes(items[props.options.option_uid])
      );
    }
    return filteredOrders;
  }, [props.items, filterValue, optionFilter]);

  const itemsShow = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...itemsShow].sort((a: Item, b: Item) => {
      const first = a[sortDescriptor.column as keyof Item] as number;
      const second = b[sortDescriptor.column as keyof Item] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, itemsShow]);

  const pages = Math.ceil(
    Math.min(filteredItems.length, props.items.length) / rowsPerPage
  );

  const renderCell = React.useCallback(
    (items: Item, columnKey: string | number) => {

      switch (columnKey) {
        case "actions":
          return (
            <div className="flex flex-row	justify-end">
            {actionButtons.map((actionButton: any) => {
              return actionButton(items)
            })}
          </div>
          );
        default:
          return (
            <div>
              <p className="text-black">{items[columnKey]}</p>
            </div>
          );
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1 text-black",
            }}
            placeholder={props.options.search_name}
            size="sm"
            startContent={<FaMagnifyingGlass className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<FaChevronDown className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  {props.options.option_name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Table Columns"
                closeOnSelect={false}
                disallowEmptySelection
                selectedKeys={optionFilter}
                selectionMode="multiple"
                onSelectionChange={setOptionFilter}
              >
                {props.options.value_option.map((option: any) => (
                  <DropdownItem
                    key={option.uid}
                    className="text-black"
                  >
                    {option.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {Math.min(filteredItems.length, props.items.length)}{" "}
            {props.options.content}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Ligne(s) par page :
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    optionFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    props.items.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, itemsShow.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
    checkboxesProps={{
        classNames: {
            wrapper: 'after:bg-foreground after:text-background text-background',
            },
    }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode={props.options.selection_mode}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            style={column.uid === "actions" ? { textAlign: "end" } : {}}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"Aucun " + props.options.content}
        items={sortedItems}
      >
        {(item) => (
          <TableRow>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}