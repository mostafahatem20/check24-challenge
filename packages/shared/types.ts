interface Craftsman {
  id: number;
  name: string; // firstname + lastname
  rankingScore: number;
}

interface Response {
  craftsmen: Craftsman[];
}

interface PatchRequest {
  // At least one of the attributes should be defined
  maxDrivingDistance?: number;
  profilePictureScore?: number;
  profileDescriptionScore?: number;
}

interface PatchResponse {
  id: number;
  updated: {
    maxDrivingDistance: number;
    profilePictureScore: number;
    profileDescriptionScore: number;
  };
}

export { Craftsman, PatchRequest, PatchResponse, Response };
