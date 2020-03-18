import User from "../../../entities/User";
import { withFilter } from "graphql-yoga";

const resolvers = {
    Subscription: {
        NearbyRideSubscription: {
            subscribe: withFilter((_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"), (payload, _, { context }) => {
                const user: User = context.currentUser;
                const { NearbyRideSubscription: { pickUpLat, PickUpLng }
                } = payload;
                const { lastLat: userLastLat, lastLng: userLastLng } = user;
                return (
                    pickUpLat >= userLastLat - 0.05 &&
                    pickUpLat <= userLastLat + 0.05 &&
                    PickUpLng >= userLastLng - 0.05 &&
                    PickUpLng <= userLastLng + 0.05
                );
            }
            ) 
        }
    }
}

export default resolvers;