import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BuildingIcon from '@mui/icons-material/Business';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HistoryIcon from '@mui/icons-material/History';

interface AcademicCenter {
  id: number;
  academic_code: string;
  institution_name: string;
}

interface GSTFieldData {
  [key: string]: {
    wantGST: string;
    gstNumber: string;
    gstName: string;
  };
}

interface Transaction {
  payment_date: string;
  transaction_id: string;
  subscription_end_date: string;
  institute_name: string;
  gst_number: string;
  order_status: string;
}

const SubscriptionPage: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
  });

  const [selectedInstitutes, setSelectedInstitutes] = useState<number[]>([]);
  const [academicCenters, setAcademicCenters] = useState<AcademicCenter[]>([]);
  const [amount, setAmount] = useState(0);
  const [gstFields, setGSTFields] = useState<GSTFieldData>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [subscriptionAmount] = useState(5000); // Example amount
  const [userTransactions] = useState<Transaction[]>([]);
  const [isAuthenticated] = useState(false); // This should come from your auth context
  const [submitLoading, setSubmitLoading] = useState(false);

  const states = [
    { id: 1, name: 'Andhra Pradesh' },
    { id: 2, name: 'Arunachal Pradesh' },
    { id: 3, name: 'Assam' },
    // Add more states as needed
  ];

  useEffect(() => {
    if (formData.state) {
      fetchAcademicCenters(formData.state);
    }
  }, [formData.state]);

  const fetchAcademicCenters = async (stateId: string) => {
    setLoadingCenters(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/academic-centers/?stateId=${stateId}`);
      const data = await response.json();
      setAcademicCenters(data || []);
    } catch (error) {
      console.error('Error fetching academic centers:', error);
      setAcademicCenters([]);
    }
    setLoadingCenters(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleInstituteChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const newSelected = e.target.value as number[];
    setSelectedInstitutes(newSelected);
    setAmount(newSelected.length * subscriptionAmount);

    // Initialize GST fields for each selected institute
    const newGSTFields: GSTFieldData = {};
    newSelected.forEach((id) => {
      if (!gstFields[id]) {
        newGSTFields[id] = { wantGST: '', gstNumber: '', gstName: '' };
      } else {
        newGSTFields[id] = gstFields[id];
      }
    });
    setGSTFields(newGSTFields);
  };

  const handleGSTChange = (instituteId: number, field: string, value: string) => {
    setGSTFields((prev) => ({
      ...prev,
      [instituteId]: {
        ...prev[instituteId],
        [field]: value,
      },
    }));
  };

  const validateGSTNumber = (gstNumber: string): boolean => {
    const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
    return gstRegex.test(gstNumber);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (selectedInstitutes.length === 0) {
      newErrors.institute = 'Please select at least one institute';
    }

    // Validate GST fields
    selectedInstitutes.forEach((id) => {
      const gst = gstFields[id];
      if (gst && gst.wantGST === 'yes') {
        if (!gst.gstNumber.trim() || !validateGSTNumber(gst.gstNumber)) {
          newErrors[`gst_${id}`] = 'Invalid GST number';
        }
        if (!gst.gstName.trim()) {
          newErrors[`gstName_${id}`] = 'GST Name is required';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitLoading(true);
    try {
      // Prepare payment data
      const paymentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        institutes: selectedInstitutes,
        amount,
        gst_data: gstFields,
      };

      // Send to your payment API
      const response = await fetch('/api/subscription/create-payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (data.success) {
        // Handle successful payment initiation
        alert('Payment initiated successfully');
        // Redirect to payment gateway or handle response
      } else {
        alert('Error: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
    setSubmitLoading(false);
  };

  const getStatusBadgeColor = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    if (status === 'CHARGED') return 'success';
    if (status === 'PENDING' || status === 'PENDING_VBV' || status === 'AUTHORIZING') return 'warning';
    if (status === 'NO_TRANSACTION') return 'default';
    return 'error';
  };

  const getStatusLabel = (status: string): string => {
    if (status === 'CHARGED') return 'Paid';
    if (status === 'PENDING' || status === 'PENDING_VBV' || status === 'AUTHORIZING') return 'Pending';
    if (status === 'NO_TRANSACTION') return 'No Payment';
    return 'Failed';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <PaymentIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          Annual Academic Subscription
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Name Field */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                error={!!errors.name}
                helperText={errors.name}
                placeholder="Enter your full name"
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>

            {/* Email Field */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                error={!!errors.email}
                helperText={errors.email}
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>

            {/* Phone Field */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                error={!!errors.phone}
                helperText={errors.phone}
                placeholder="Enter phone number"
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>

            {/* State Field */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.state}>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={formData.state}
                  onChange={handleFormChange as any}
                  label="State"
                  startAdornment={<LocationOnIcon sx={{ mr: 1, color: 'action.active' }} />}
                >
                  <MenuItem value="">-- Select State --</MenuItem>
                  {states.map((state) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Academic Institute Field */}
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth error={!!errors.institute}>
                <InputLabel>Academic Institute</InputLabel>
                <Select
                  multiple
                  name="institute"
                  value={selectedInstitutes}
                  onChange={handleInstituteChange as any}
                  label="Academic Institute"
                  disabled={loadingCenters || !formData.state}
                >
                  {loadingCenters ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                    </MenuItem>
                  ) : (
                    academicCenters.map((center) => (
                      <MenuItem key={center.id} value={center.id}>
                        {center.academic_code} - {center.institution_name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                You can search institute by academic code or name.
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                Payment can be made for multiple institutes simultaneously.
              </Typography>
            </Grid>

            {/* Amount Field */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                value={amount}
                disabled
                InputProps={{
                  startAdornment: <CurrencyRupeeIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>

            {/* GST Fields */}
            {selectedInstitutes.length > 0 && (
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  GST Details
                </Typography>
                {selectedInstitutes.map((instituteId) => {
                  const institute = academicCenters.find((c) => c.id === instituteId);
                  const gst = gstFields[instituteId] || { wantGST: '', gstNumber: '', gstName: '' };

                  return (
                    <Paper key={instituteId} variant="outlined" sx={{ p: 2, mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        <BuildingIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        {institute?.academic_code} - {institute?.institution_name}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Do you want a GST-compliant invoice? <span style={{ color: 'red' }}>*</span>
                      </Typography>

                      <RadioGroup
                        row
                        name={`want_gst_${instituteId}`}
                        value={gst.wantGST}
                        onChange={(e) => handleGSTChange(instituteId, 'wantGST', e.target.value)}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>

                      <Typography variant="caption" display="block" sx={{ mt: 1, mb: 2, color: 'text.secondary' }}>
                        <strong>Note:</strong> A GST-compliant invoice will be provided only if you select "Yes" and enter valid GST
                        details. If you select "No", this option cannot be changed to "Yes" later.
                      </Typography>

                      {gst.wantGST === 'yes' && (
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                              fullWidth
                              label="GST Number"
                              value={gst.gstNumber}
                              onChange={(e) => handleGSTChange(instituteId, 'gstNumber', e.target.value)}
                              error={!!errors[`gst_${instituteId}`]}
                              helperText={errors[`gst_${instituteId}`]}
                              inputProps={{ maxLength: 15 }}
                              required
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 8 }}>
                            <TextField
                              fullWidth
                              label="Name as per GST"
                              value={gst.gstName}
                              onChange={(e) => handleGSTChange(instituteId, 'gstName', e.target.value)}
                              error={!!errors[`gstName_${instituteId}`]}
                              helperText={errors[`gstName_${instituteId}`]}
                              required
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Paper>
                  );
                })}
              </Grid>
            )}

            {/* Submit Button */}
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={submitLoading}
                startIcon={<PaymentIcon />}
              >
                {submitLoading ? <CircularProgress size={24} sx={{ mr: 1 }} /> : 'Make Payment'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Transaction History */}
      {isAuthenticated && userTransactions.length > 0 && (
        <Paper elevation={2} sx={{ mt: 4, p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <HistoryIcon /> Your Transaction History
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Payment Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Subscription End Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Institute Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>GST Number</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userTransactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(transaction.payment_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {transaction.transaction_id}
                      </Typography>
                    </TableCell>
                    <TableCell>{new Date(transaction.subscription_end_date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.institute_name}</TableCell>
                    <TableCell>{transaction.gst_number}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(transaction.order_status)}
                        color={getStatusBadgeColor(transaction.order_status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {isAuthenticated && userTransactions.length === 0 && (
        <Alert severity="info" sx={{ mt: 4 }}>
          No transaction history found for your account.
        </Alert>
      )}
    </Container>
  );
};

export default SubscriptionPage;
