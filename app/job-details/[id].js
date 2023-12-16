import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { useRouter, useSearchParams, Stack } from 'expo-router';
import useFetch from '../../hook/useFetch';
import { COLORS, SIZES, icons } from '../../constants';
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn';
import { useState } from 'react';
import { isLoading } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import Company from '../../components/jobdetails/company/Company';
import Tabs from '../../components/jobdetails/tabs/Tabs';
const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error } = useFetch('job-details', {
    job_id: params.id,
  });

  const onRefresh = () => {};
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: `${params.id}`,
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} size={'large'} />
          ) : error ? (
            <Text>Something Wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <Tabs />
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
