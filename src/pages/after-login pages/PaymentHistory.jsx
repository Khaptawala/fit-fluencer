import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText, 
  ArrowDownUp, 
  CheckCircle2, 
  XCircle,
  Clock,
  Info,
  Receipt,
  RefreshCw,
  FileType
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [viewPaymentDetails, setViewPaymentDetails] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockPayments = [
        {
          id: 'pay_H23K9J5L2M4N',
          payment_id: 'razorpay_JH56KL78MN90',
          order_id: 'order_KL78M34N56PQ',
          receipt: 'receipt_JK67L89M12N3',
          amount: 2999.00,
          currency: 'INR',
          plan_name: 'Monthly Plan',
          status: 'captured',
          payment_method: 'UPI',
          created_at: '2023-12-15T14:23:45',
          fee: 59.98,
          tax: 29.99
        },
        {
          id: 'pay_P34Q7R8S9T0U',
          payment_id: 'razorpay_KL90MN12PQ34',
          order_id: 'order_MN12P45Q67RS',
          receipt: 'receipt_NP34Q56R78ST',
          amount: 7999.00,
          currency: 'INR',
          plan_name: 'Quarterly Plan',
          status: 'captured',
          payment_method: 'Card',
          created_at: '2023-09-22T10:15:32',
          fee: 159.98,
          tax: 79.99
        },
        {
          id: 'pay_V56W8X9Y0Z1A',
          payment_id: 'razorpay_RS56TU78VW90',
          order_id: 'order_TU78V90W12XY',
          receipt: 'receipt_VW90X12Y34Z5',
          amount: 14999.00,
          currency: 'INR',
          plan_name: 'Biannual Plan',
          status: 'failed',
          payment_method: 'Net Banking',
          created_at: '2023-06-10T16:45:12',
          fee: 299.98,
          tax: 149.99
        },
        {
          id: 'pay_B67C8D9E0F1G',
          payment_id: 'razorpay_XY12Z34A56BC',
          order_id: 'order_Z12A34B56CD7',
          receipt: 'receipt_A34B56C78D90',
          amount: 24999.00,
          currency: 'INR',
          plan_name: 'Annual Plan',
          status: 'created',
          payment_method: 'UPI',
          created_at: '2023-03-05T09:30:28',
          fee: 499.98,
          tax: 249.99
        },
        {
          id: 'pay_H23K9J5L2M4N2',
          payment_id: 'razorpay_JH56KL78MN902',
          order_id: 'order_KL78M34N56PQ2',
          receipt: 'receipt_JK67L89M12N32',
          amount: 2999.00,
          currency: 'INR',
          plan_name: 'Monthly Plan',
          status: 'captured',
          payment_method: 'Card',
          created_at: '2022-12-15T14:23:45',
          fee: 59.98,
          tax: 29.99
        }
      ];
      
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter payments based on search term and status filter
  useEffect(() => {
    let result = payments;
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(payment => payment.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(payment => 
        payment.payment_id.toLowerCase().includes(lowercasedTerm) ||
        payment.plan_name.toLowerCase().includes(lowercasedTerm) ||
        payment.payment_method.toLowerCase().includes(lowercasedTerm) ||
        payment.order_id.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    // Sort results
    result = [...result].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'amount' || sortConfig.key === 'fee' || sortConfig.key === 'tax') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (sortConfig.key === 'created_at') {
        return sortConfig.direction === 'asc' 
          ? new Date(aValue) - new Date(bValue) 
          : new Date(bValue) - new Date(aValue);
      }
      
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
    
    setFilteredPayments(result);
  }, [payments, searchTerm, statusFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: 
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc'
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const statusVariants = {
    captured: {
      icon: <CheckCircle2 className="h-4 w-4" />,
      color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200',
      label: 'Success'
    },
    failed: {
      icon: <XCircle className="h-4 w-4" />,
      color: 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200',
      label: 'Failed'
    },
    created: {
      icon: <Clock className="h-4 w-4" />,
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200',
      label: 'Pending'
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  // Add these new animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      scale: 1.01, 
      backgroundColor: "rgba(241, 245, 249, 0.9)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  };

  // Currency formatter
  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: currency 
    }).format(amount);
  };

  const downloadInvoice = (paymentId) => {
    console.log(`Downloading invoice for payment: ${paymentId}`);
    // In a real app, this would trigger a download from the backend
  };

  // Add a function to view PDF
  const viewPdfInvoice = (paymentId) => {
    console.log(`Viewing PDF invoice for payment: ${paymentId}`);
    // In a real app, this would open a PDF viewer or a new tab with the PDF
    // You could use window.open() to open a PDF URL
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Payment <span className="text-emerald-500">History</span>
          </h1>
          <p className="mt-2 text-slate-500">
            View and manage all your subscription payments in one place
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-emerald-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-emerald-500" />
                  <span>Total Spent</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {isLoading ? (
                    <div className="h-8 w-32 bg-slate-200 animate-pulse rounded"></div>
                  ) : (
                    formatCurrency(
                      filteredPayments
                        .filter(p => p.status === 'captured')
                        .reduce((sum, payment) => sum + payment.amount, 0)
                    )
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Across {filteredPayments.filter(p => p.status === 'captured').length} successful payments
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  <span>Current Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-slate-900">
                  {isLoading ? (
                    <div className="h-8 w-32 bg-slate-200 animate-pulse rounded"></div>
                  ) : (
                    filteredPayments.length > 0 && filteredPayments[0].status === 'captured' 
                      ? filteredPayments[0].plan_name 
                      : 'No active plan'
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Next payment: {isLoading ? '-' : '15 Jan 2024'}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-slate-700 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <span>Last Payment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-slate-900">
                  {isLoading ? (
                    <div className="h-8 w-32 bg-slate-200 animate-pulse rounded"></div>
                  ) : (
                    filteredPayments.length > 0 && filteredPayments[0].status === 'captured'
                      ? formatDate(filteredPayments[0].created_at)
                      : 'No payments yet'
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {isLoading ? '-' : filteredPayments.length > 0 && filteredPayments[0].status === 'captured'
                    ? `${formatCurrency(filteredPayments[0].amount)} - ${filteredPayments[0].payment_method}`
                    : 'Make your first payment'
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6"
        >
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white border-slate-200 w-full sm:w-80 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter: {statusFilter === 'all' ? 'All' : 
                    statusFilter === 'captured' ? 'Successful' : 
                    statusFilter === 'failed' ? 'Failed' : 'Pending'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter('all')} className="cursor-pointer">
                  All Payments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('captured')} className="cursor-pointer">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
                  Successful
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('failed')} className="cursor-pointer">
                  <XCircle className="h-4 w-4 mr-2 text-red-500" />
                  Failed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('created')} className="cursor-pointer">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  Pending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" onClick={() => window.print()} className="hidden sm:flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 800);
                    }}
                    className="text-slate-600 hover:text-emerald-500"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh payments</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>

        {/* Payments Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200"
        >
          <ScrollArea className="h-[500px] w-full rounded-md">
            <motion.div
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              className="min-w-full"
            >
              <Table>
                <TableHeader className="bg-gradient-to-r from-slate-50 to-slate-100 sticky top-0 z-10">
                  <TableRow className="border-b-2 border-slate-200">
                    <TableHead 
                      className="cursor-pointer group py-4 w-[15%] hover:text-emerald-600 transition-colors" 
                      onClick={() => handleSort('created_at')}
                    >
                      <div className="flex items-center gap-1">
                        <span>Date</span>
                        <motion.div
                          animate={sortConfig.key === 'created_at' ? { rotate: sortConfig.direction === 'asc' ? 0 : 180 } : {}}
                          transition={{ duration: 0.2 }}
                          className="opacity-70 group-hover:opacity-100"
                        >
                          <ArrowDownUp className="h-3 w-3" />
                        </motion.div>
                      </div>
                    </TableHead>
                    <TableHead className="py-4 w-[18%]">
                      <div className="flex items-center gap-1">
                        <span>Transaction ID</span>
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer group py-4 w-[15%] hover:text-emerald-600 transition-colors" 
                      onClick={() => handleSort('plan_name')}
                    >
                      <div className="flex items-center gap-1">
                        <span>Plan</span>
                        <motion.div
                          animate={sortConfig.key === 'plan_name' ? { rotate: sortConfig.direction === 'asc' ? 0 : 180 } : {}}
                          transition={{ duration: 0.2 }}
                          className="opacity-70 group-hover:opacity-100"
                        >
                          <ArrowDownUp className="h-3 w-3" />
                        </motion.div>
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer group py-4 w-[15%] hover:text-emerald-600 transition-colors"
                      onClick={() => handleSort('amount')}
                    >
                      <div className="flex items-center gap-1">
                        <span>Amount</span>
                        <motion.div
                          animate={sortConfig.key === 'amount' ? { rotate: sortConfig.direction === 'asc' ? 0 : 180 } : {}}
                          transition={{ duration: 0.2 }}
                          className="opacity-70 group-hover:opacity-100"
                        >
                          <ArrowDownUp className="h-3 w-3" />
                        </motion.div>
                      </div>
                    </TableHead>
                    <TableHead className="py-4 w-[15%]">Status</TableHead>
                    <TableHead 
                      className="cursor-pointer group py-4 w-[12%] hover:text-emerald-600 transition-colors"
                      onClick={() => handleSort('payment_method')}
                    >
                      <div className="flex items-center gap-1">
                        <span>Method</span>
                        <motion.div
                          animate={sortConfig.key === 'payment_method' ? { rotate: sortConfig.direction === 'asc' ? 0 : 180 } : {}}
                          transition={{ duration: 0.2 }}
                          className="opacity-70 group-hover:opacity-100"
                        >
                          <ArrowDownUp className="h-3 w-3" />
                        </motion.div>
                      </div>
                    </TableHead>
                    <TableHead className="text-right py-4 pl-2 w-[10%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array(5).fill(0).map((_, index) => (
                      <TableRow key={index} className="border-b border-slate-100">
                        {Array(7).fill(0).map((_, cellIndex) => (
                          <TableCell key={cellIndex} className="py-4">
                            <motion.div 
                              className="h-6 bg-slate-200 rounded"
                              animate={{ 
                                opacity: [0.5, 0.8, 0.5],
                                backgroundPosition: ['0% 0%', '100% 100%']
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                              style={{
                                backgroundSize: '200% 200%',
                                backgroundImage: 'linear-gradient(90deg, rgba(203, 213, 225, 0.5) 0%, rgba(226, 232, 240, 0.8) 50%, rgba(203, 213, 225, 0.5) 100%)'
                              }}
                            ></motion.div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-60 text-center text-slate-500">
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }} 
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center justify-center gap-3"
                        >
                          <motion.div
                            animate={pulseAnimation}
                            className="p-4 rounded-full bg-slate-100"
                          >
                            <Info className="h-10 w-10 text-slate-400" />
                          </motion.div>
                          <p className="font-medium text-lg">No payment records found</p>
                          <p className="text-sm max-w-md">Try adjusting your search or filter criteria to find what you're looking for</p>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4"
                          >
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setSearchTerm('');
                                setStatusFilter('all');
                              }}
                              className="flex items-center gap-2"
                            >
                              <RefreshCw className="h-4 w-4" />
                              Reset Filters
                            </Button>
                          </motion.div>
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment, index) => (
                      <motion.tr
                        key={payment.id}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.05
                        }}
                        className="relative border-b border-slate-100 group cursor-pointer"
                        onClick={() => setViewPaymentDetails(payment)}
                      >
                        <TableCell className="font-medium py-4 pl-4">
                          <div className="flex flex-col">
                            <span>{formatDate(payment.created_at).split(',')[0]}</span>
                            <span className="text-xs text-slate-400">
                              {formatDate(payment.created_at).split(',')[1]}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs py-4">
                          <div className="flex items-center">
                            <div className="bg-slate-100 p-1 rounded mr-2">
                              <Receipt className="h-3 w-3 text-slate-500" />
                            </div>
                            <span>{payment.payment_id.slice(0, 10)}...</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="inline-flex items-center">
                            <motion.span
                              className={`mr-2 inline-block w-2 h-2 rounded-full ${
                                payment.plan_name.includes('Monthly') ? 'bg-blue-400' :
                                payment.plan_name.includes('Quarterly') ? 'bg-emerald-400' :
                                payment.plan_name.includes('Biannual') ? 'bg-purple-400' :
                                'bg-amber-400'
                              }`}
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {payment.plan_name}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium py-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-slate-700"
                          >
                            {formatCurrency(payment.amount, payment.currency)}
                          </motion.div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge 
                            variant="outline" 
                            className={`flex items-center gap-1 py-1 ${statusVariants[payment.status].color}`}
                          >
                            {payment.status === 'captured' && (
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                {statusVariants[payment.status].icon}
                              </motion.div>
                            )}
                            {payment.status === 'failed' && (
                              <motion.div
                                animate={{
                                  rotate: [0, 5, 0, -5, 0],
                                }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                              >
                                {statusVariants[payment.status].icon}
                              </motion.div>
                            )}
                            {payment.status === 'created' && (
                              <motion.div
                                animate={{
                                  rotate: 360,
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              >
                                {statusVariants[payment.status].icon}
                              </motion.div>
                            )}
                            <span>{statusVariants[payment.status].label}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center">
                            <div className={`p-1 rounded-full mr-2 ${
                              payment.payment_method === 'UPI' ? 'bg-blue-50 text-blue-500' :
                              payment.payment_method === 'Card' ? 'bg-purple-50 text-purple-500' :
                              'bg-amber-50 text-amber-500'
                            }`}>
                              {payment.payment_method === 'UPI' ? (
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M16.5,12.5h-9c-0.83,0-1.5-0.67-1.5-1.5V8c0-0.83,0.67-1.5,1.5-1.5h9c0.83,0,1.5,0.67,1.5,1.5v3C18,11.83,17.33,12.5,16.5,12.5z"/>
                                  <path d="M22,12c0,5.52-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2S22,6.48,22,12z M20,12c0-4.42-3.58-8-8-8s-8,3.58-8,8s3.58,8,8,8S20,16.42,20,12z"/>
                                </svg>
                              ) : payment.payment_method === 'Card' ? (
                                <CreditCard className="h-3 w-3" />
                              ) : (
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M19.5,3.5h-15c-0.55,0-1,0.45-1,1v15c0,0.55,0.45,1,1,1h15c0.55,0,1-0.45,1-1v-15C20.5,3.95,20.05,3.5,19.5,3.5z M18.5,18.5h-13v-13h13V18.5z"/>
                                  <path d="M13.5,10.5h-3c-0.28,0-0.5,0.22-0.5,0.5v3c0,0.28,0.22,0.5,0.5,0.5h3c0.28,0,0.5-0.22,0.5-0.5v-3C14,10.72,13.78,10.5,13.5,10.5z"/>
                                </svg>
                              )}
                            </div>
                            <span>{payment.payment_method}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-4 pr-4 pl-2">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-5 group-hover:translate-x-0">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      className="bg-slate-50 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-200"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setViewPaymentDetails(payment);
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </motion.div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-800 text-white">
                                  <p>View details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            {payment.status === 'captured' && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          downloadInvoice(payment.id);
                                        }}
                                      >
                                        <FileText className="h-4 w-4" />
                                      </Button>
                                    </motion.div>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-slate-800 text-white">
                                    <p>Download invoice</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        
                        {/* Highlight stripe that appears on hover */}
                        <motion.div 
                          className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-l"
                          initial={{ opacity: 0, height: 0 }}
                          whileHover={{ opacity: 1, height: '100%' }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </motion.div>
          </ScrollArea>
        </motion.div>

        {/* View Payment Details Dialog */}
        {viewPaymentDetails && (
          <Dialog open={!!viewPaymentDetails} onOpenChange={() => setViewPaymentDetails(null)}>
            <DialogContent className="sm:max-w-lg bg-white rounded-xl overflow-hidden p-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`${
                  viewPaymentDetails.status === 'captured' ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                  viewPaymentDetails.status === 'failed' ? 'bg-gradient-to-r from-red-400 to-red-500' :
                  'bg-gradient-to-r from-blue-400 to-blue-500'
                } p-6 text-white`}>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <Receipt className="h-6 w-6" />
                    Payment Details
                  </DialogTitle>
                  <DialogDescription className="text-white/80 mt-2">
                    Complete information about your payment transaction
                  </DialogDescription>
                  
                  <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
                    <div className="flex flex-col">
                      <span className="text-white/70 text-sm">Amount</span>
                      <span className="text-2xl font-bold">{formatCurrency(viewPaymentDetails.amount, viewPaymentDetails.currency)}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-white/70 text-sm">Status</span>
                      <div className="flex items-center gap-2">
                        {viewPaymentDetails.status === 'captured' && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <CheckCircle2 className="h-5 w-5" />
                          </motion.div>
                        )}
                        {viewPaymentDetails.status === 'failed' && <XCircle className="h-5 w-5" />}
                        {viewPaymentDetails.status === 'created' && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          >
                            <Clock className="h-5 w-5" />
                          </motion.div>
                        )}
                        <span className="font-semibold text-lg capitalize">{viewPaymentDetails.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 pt-6 pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Transaction ID</p>
                        <div className="flex items-center bg-slate-50 p-2 rounded border border-slate-200">
                          <Receipt className="h-4 w-4 text-slate-400 mr-2" />
                          <p className="font-mono text-xs">{viewPaymentDetails.payment_id}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Order ID</p>
                        <div className="flex items-center bg-slate-50 p-2 rounded border border-slate-200">
                          <p className="font-mono text-xs">{viewPaymentDetails.order_id}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Receipt</p>
                        <div className="flex items-center bg-slate-50 p-2 rounded border border-slate-200">
                          <p className="font-mono text-xs">{viewPaymentDetails.receipt}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Date & Time</p>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-slate-400 mr-2" />
                          <p>{formatDate(viewPaymentDetails.created_at)}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Plan</p>
                        <div className="flex items-center">
                          <div className={`mr-2 w-3 h-3 rounded-full ${
                            viewPaymentDetails.plan_name.includes('Monthly') ? 'bg-blue-400' :
                            viewPaymentDetails.plan_name.includes('Quarterly') ? 'bg-emerald-400' :
                            viewPaymentDetails.plan_name.includes('Biannual') ? 'bg-purple-400' :
                            'bg-amber-400'
                          }`} />
                          <p className="font-medium">{viewPaymentDetails.plan_name}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Payment Method</p>
                        <div className="flex items-center">
                          {viewPaymentDetails.payment_method === 'UPI' ? (
                            <div className="bg-blue-100 p-1 rounded text-blue-500 mr-2">
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.5,12.5h-9c-0.83,0-1.5-0.67-1.5-1.5V8c0-0.83,0.67-1.5,1.5-1.5h9c0.83,0,1.5,0.67,1.5,1.5v3C18,11.83,17.33,12.5,16.5,12.5z"/>
                                <path d="M22,12c0,5.52-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2S22,6.48,22,12z M20,12c0-4.42-3.58-8-8-8s-8,3.58-8,8s3.58,8,8,8S20,16.42,20,12z"/>
                              </svg>
                            </div>
                          ) : viewPaymentDetails.payment_method === 'Card' ? (
                            <div className="bg-purple-100 p-1 rounded text-purple-500 mr-2">
                              <CreditCard className="h-4 w-4" />
                            </div>
                          ) : (
                            <div className="bg-amber-100 p-1 rounded text-amber-500 mr-2">
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.5,3.5h-15c-0.55,0-1,0.45-1,1v15c0,0.55,0.45,1,1,1h15c0.55,0,1-0.45,1-1v-15C20.5,3.95,20.05,3.5,19.5,3.5z M18.5,18.5h-13v-13h13V18.5z"/>
                                <path d="M13.5,10.5h-3c-0.28,0-0.5,0.22-0.5,0.5v3c0,0.28,0.22,0.5,0.5,0.5h3c0.28,0,0.5-0.22,0.5-0.5v-3C14,10.72,13.78,10.5,13.5,10.5z"/>
                              </svg>
                            </div>
                          )}
                          <p>{viewPaymentDetails.payment_method}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <h4 className="text-sm font-medium text-slate-500 mb-3">Payment Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-slate-600">Subtotal</p>
                        <p className="font-medium">{formatCurrency(viewPaymentDetails.amount - viewPaymentDetails.fee - viewPaymentDetails.tax, viewPaymentDetails.currency)}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-slate-600">Fee</p>
                        <p>{formatCurrency(viewPaymentDetails.fee, viewPaymentDetails.currency)}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-slate-600">Tax</p>
                        <p>{formatCurrency(viewPaymentDetails.tax, viewPaymentDetails.currency)}</p>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-200 pt-2 mt-2">
                        <p className="font-medium">Total</p>
                        <p className="font-bold">{formatCurrency(viewPaymentDetails.amount, viewPaymentDetails.currency)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50 border-t border-slate-200 mt-6">
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <Button variant="outline" onClick={() => setViewPaymentDetails(null)}>
                      Close
                    </Button>
                    {viewPaymentDetails.status === 'captured' && (
                      <>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            onClick={() => downloadInvoice(viewPaymentDetails.id)} 
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600"
                          >
                            <Download className="h-4 w-4" />
                            Download Invoice
                          </Button>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.90 }}
                          className="relative overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-blue-400 rounded-md"
                            initial={{ opacity: 0 }}
                            whileTap={{ 
                              opacity: 0.2,
                              scale: 1.5, 
                              transition: { duration: 0.4 } 
                            }}
                          />
                          <Button 
                            onClick={() => viewPdfInvoice(viewPaymentDetails.id)} 
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 relative z-10"
                          >
                            <motion.div
                              whileTap={{ rotate: [0, -10, 10, -10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              <FileText className="h-4 w-4" />
                            </motion.div>
                            <span>View PDF</span>
                          </Button>
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
