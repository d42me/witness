import {
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILURE,
  CREATE_RECORD_REQUEST,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAILURE
} from './types';

export const fetchReports = () => {
  return dispatch => {
    dispatch({ type: FETCH_REPORTS_REQUEST });

    // Axios logic
    // SUCCESS: dispatch({ type: FETCH_REPORTS_SUCCESS, payload: res  });
    // FAILURE: dispatch({ type: FETCH_REPORTS_FAILURE, payload: e  });
  };
};

export const createReport = ({ keys, answers }) => {
  return dispatch => {
    dispatch({ type: CREATE_RECORD_REQUEST });

    // Wrap data

    const report = {};
    const i = 0;
    for (const answer of answers) {
      const key = keys[i];
      const reportQuestion = { [key]: answer };
      report.push({
        reportQuestion
      });
    }

    // Ready to send report

    // Axios logic
    // SUCCESS: dispatch({ type: FETCH_REPORTS_SUCCESS, payload: res  });
    // FAILURE: dispatch({ type: FETCH_REPORTS_FAILURE, payload: e  });
  };
};
