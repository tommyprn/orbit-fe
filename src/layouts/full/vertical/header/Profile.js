import React, { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { Stack } from '@mui/system';
import { IconLogout, IconUserCircle } from '@tabler/icons';
import { Box, Menu, Button, Avatar, Divider, Typography, IconButton } from '@mui/material';

import ProfileImg from 'src/assets/images/profile/user-1.jpg';

const users = JSON.parse(secureLocalStorage.getItem('user'));
const role = JSON.parse(secureLocalStorage.getItem('selectedRoleName'));

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleBack = () => {
    window.location.href = 'http://10.55.54.152/maps-login';
    secureLocalStorage.removeItem('menuItem');
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        >
          {users?.nameUser[0]}
        </Avatar>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            p: 4,
          },
        }}
      >
        <Typography variant="h5">User Profile</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <IconUserCircle width={120} height={120} strokeWidth={1} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography
              sx={{ marginBottom: '1px' }}
              variant="h6"
              color="textPrimary"
              fontWeight={600}
            >
              {users?.nikUser} - {users?.nameUser}
            </Typography>
            {users?.idDivisiUser === '21' ? (
              <Typography variant="body" color="textSecondary">
                {users?.namaCabangUser.charAt(0) + users?.namaCabangUser.substring(1).toLowerCase()}{' '}
                -{' '}
                {users?.namaCabangKcuUser.charAt(0) +
                  users?.namaCabangKcuUser.substring(1).toLowerCase()}
              </Typography>
            ) : (
              <Typography variant="body" color="textSecondary">
                {users?.departementUser
                  ? users?.departementUser?.charAt(0) +
                    users?.departementUser?.substring(1).toLowerCase()
                  : null}
                {users?.departementUser ? ' - ' : null}
                {users?.divisiUser.charAt(0) + users?.divisiUser.substring(1).toLowerCase()}
              </Typography>
            )}
            <Typography variant="body" color="textSecondary">
              {role}
            </Typography>
          </Box>
        </Stack>
        <Divider />

        <Box mt={2}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleBack}
            startIcon={<IconLogout />}
          >
            Log Out
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
