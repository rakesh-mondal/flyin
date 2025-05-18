import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Table>
        <TableCaption>A list of recent bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Flight</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">NYC → LAX</TableCell>
            <TableCell>May 15, 2023</TableCell>
            <TableCell>Confirmed</TableCell>
            <TableCell className="text-right">$349.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BOS → SFO</TableCell>
            <TableCell>June 10, 2023</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className="text-right">$429.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">SEA → DEN</TableCell>
            <TableCell>July 22, 2023</TableCell>
            <TableCell>Confirmed</TableCell>
            <TableCell className="text-right">$299.99</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$1,079.97</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

export const WithFilteredColumns: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Flight</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">NYC → LAX</TableCell>
            <TableCell>May 15, 2023</TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Confirmed
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BOS → SFO</TableCell>
            <TableCell>June 10, 2023</TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                Pending
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">SEA → DEN</TableCell>
            <TableCell>July 22, 2023</TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Confirmed
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow className="[&_th]:py-1 [&_th]:text-xs">
            <TableHead>Flight</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="[&_td]:py-1 [&_td]:text-xs">
            <TableCell>NYC → LAX</TableCell>
            <TableCell>05/15/23</TableCell>
            <TableCell>OK</TableCell>
          </TableRow>
          <TableRow className="[&_td]:py-1 [&_td]:text-xs">
            <TableCell>BOS → SFO</TableCell>
            <TableCell>06/10/23</TableCell>
            <TableCell>WAIT</TableCell>
          </TableRow>
          <TableRow className="[&_td]:py-1 [&_td]:text-xs">
            <TableCell>SEA → DEN</TableCell>
            <TableCell>07/22/23</TableCell>
            <TableCell>OK</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}; 