import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

interface ReportData {
  metrics: {
    label: string;
    value: string;
    trend: string;
    trendUp: boolean;
  }[];
  salesData: {
    date: string;
    revenue: number;
    tickets: number;
  }[];
  topEvents: {
    name: string;
    tickets: number;
    revenue: number;
  }[];
}

export const exportReportToPDF = (reportData: ReportData, dateRange: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Title
  doc.setFontSize(20);
  doc.text('Sanctus Events - Analytics Report', pageWidth / 2, 20, { align: 'center' });
  
  // Date Range
  doc.setFontSize(12);
  doc.text(`Report Period: ${dateRange}`, pageWidth / 2, 30, { align: 'center' });
  doc.text(`Generated on: ${format(new Date(), 'MMMM d, yyyy')}`, pageWidth / 2, 35, { align: 'center' });

  // Key Metrics
  doc.setFontSize(16);
  doc.text('Key Metrics', 14, 50);
  
  const metricsData = reportData.metrics.map(metric => [
    metric.label,
    metric.value,
    `${metric.trendUp ? '↑' : '↓'} ${metric.trend}`
  ]);

  autoTable(doc, {
    startY: 55,
    head: [['Metric', 'Value', 'Trend']],
    body: metricsData,
    theme: 'striped',
    headStyles: { fillColor: [220, 38, 38] },
  });

  // Top Performing Events
  doc.addPage();
  doc.setFontSize(16);
  doc.text('Top Performing Events', 14, 20);

  const eventsData = reportData.topEvents.map(event => [
    event.name,
    event.tickets.toString(),
    `$${event.revenue.toLocaleString()}`
  ]);

  autoTable(doc, {
    startY: 25,
    head: [['Event Name', 'Tickets Sold', 'Revenue']],
    body: eventsData,
    theme: 'striped',
    headStyles: { fillColor: [220, 38, 38] },
  });

  // Sales Data
  doc.addPage();
  doc.setFontSize(16);
  doc.text('Daily Sales Overview', 14, 20);

  const salesData = reportData.salesData.map(data => [
    format(new Date(data.date), 'MMM d, yyyy'),
    data.tickets.toString(),
    `$${data.revenue.toLocaleString()}`
  ]);

  autoTable(doc, {
    startY: 25,
    head: [['Date', 'Tickets', 'Revenue']],
    body: salesData,
    theme: 'striped',
    headStyles: { fillColor: [220, 38, 38] },
  });

  // Save the PDF
  doc.save(`sanctus-events-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};