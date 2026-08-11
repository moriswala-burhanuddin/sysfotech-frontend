import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import logo from "@/assets/64x64-1.svg";

const mockInvoiceData = {
  invoiceNumber: "INV-2024-0892",
  issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  status: "Paid",
  company: {
    name: "Sysfotech IT Services",
    addressLine1: "124 City Road",
    addressLine2: "London, EC1V 2NX",
    country: "United Kingdom",
    email: "billing@sysfotech.uk",
    taxId: "GB 123 4567 89"
  },
  client: {
    name: "John Doe",
    email: "john.doe@example.com",
    addressLine1: "Provided at checkout",
    addressLine2: "",
    country: ""
  },
  items: [
    {
      id: 1,
      description: "Complete Web Development Bootcamp",
      quantity: 1,
      unitPrice: 99.99,
      total: 99.99
    }
  ],
  subtotal: 99.99,
  taxRate: 0, 
  taxAmount: 0.00,
  total: 99.99
};

const Invoice = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const state = location.state as any;

  // Use dynamic state if coming from checkout, else fallback to mock
  const clientName = state?.studentName || mockInvoiceData.client.name;
  const clientEmail = state?.email || mockInvoiceData.client.email;
  const issueDate = state?.date || mockInvoiceData.issueDate;
  
  const items = state?.course ? [
    {
      id: 1,
      description: state.course.title,
      quantity: 1,
      unitPrice: state.course.price,
      total: state.course.price
    }
  ] : mockInvoiceData.items;

  const subtotal = items.reduce((acc: number, item: any) => acc + item.total, 0);
  const taxRate = 0; 
  const taxAmount = 0;
  const total = subtotal;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-muted/30 print:bg-white print:pt-0 print:pb-0">
      <div className="max-w-4xl mx-auto">
        
        {/* Actions Bar - Hidden on print */}
        <div className="flex justify-between items-center mb-6 print:hidden">
          <h1 className="text-2xl font-bold tracking-tight">Invoice</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button className="bg-orange-primary hover:bg-orange-600 text-white">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Invoice Card */}
        <Card ref={invoiceRef} className="p-8 sm:p-12 shadow-lg border-border/50 bg-white print:shadow-none print:border-none print:p-0">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Sysfotech Logo" className="w-12 h-12" />
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">{mockInvoiceData.company.name}</h2>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">IT Services</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{mockInvoiceData.company.addressLine1}</p>
                <p>{mockInvoiceData.company.addressLine2}</p>
                <p>{mockInvoiceData.company.country}</p>
                <p className="mt-2 text-slate-600 font-medium">{mockInvoiceData.company.email}</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4 border border-green-200">
                {mockInvoiceData.status}
              </div>
              <h3 className="text-3xl font-light text-slate-400 mb-1">INVOICE</h3>
              <p className="text-lg font-medium text-slate-900">{mockInvoiceData.invoiceNumber}</p>
              <div className="mt-4 text-sm text-muted-foreground space-y-1">
                <p>Issue Date: <span className="text-slate-900 font-medium">{issueDate}</span></p>
                <p>Due Date: <span className="text-slate-900 font-medium">{mockInvoiceData.dueDate}</span></p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-slate-200" />

          {/* Billing Info */}
          <div className="grid sm:grid-cols-2 gap-12 mb-12">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Billed To</h4>
              <div className="text-sm text-slate-900 space-y-1">
                <p className="font-bold text-base mb-2">{clientName}</p>
                <p className="mt-2 text-orange-primary font-medium">{clientEmail}</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mb-8 overflow-hidden rounded-xl border border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[50%] font-bold text-slate-900">Description</TableHead>
                  <TableHead className="text-right font-bold text-slate-900">Quantity</TableHead>
                  <TableHead className="text-right font-bold text-slate-900">Unit Price</TableHead>
                  <TableHead className="text-right font-bold text-slate-900">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="border-slate-100">
                    <TableCell className="font-medium text-slate-900">{item.description}</TableCell>
                    <TableCell className="text-right text-slate-600">{item.quantity}</TableCell>
                    <TableCell className="text-right text-slate-600">${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium text-slate-900">${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Totals */}
          <div className="flex flex-col items-end justify-end mb-12">
            <div className="w-full sm:w-1/2 lg:w-1/3 space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>VAT ({taxRate}%)</span>
                <span className="font-medium text-slate-900">${taxAmount.toFixed(2)}</span>
              </div>
              <Separator className="my-2 bg-slate-200" />
              <div className="flex justify-between items-center text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 text-center sm:text-left text-sm text-slate-500">
             {state?.magicLinkToken && (
               <div className="mb-4 p-4 bg-green-50 rounded-lg text-green-800 border border-green-200">
                 <p className="font-bold">Your secure Magic Link Token:</p>
                 <code className="text-xs break-all">{state.magicLinkToken}</code>
                 <p className="text-xs mt-1">(Check your email for the actual login link!)</p>
               </div>
             )}
            <p className="font-medium text-slate-900 mb-1">Thank you for your business!</p>
            <p>If you have any questions about this invoice, please contact {mockInvoiceData.company.email}</p>
            <p className="mt-4 text-xs text-slate-400">VAT Registration No: {mockInvoiceData.company.taxId}</p>
          </div>

        </Card>
      </div>
    </div>
  );
};

export default Invoice;
