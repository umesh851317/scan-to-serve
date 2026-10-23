import BillSummary from "./BillSummary";
import CashPaymentRequest from "./CashPaymentRequest";
import EndTableSessionButton from "./EndTableSessionButton";
import MemberList from "./MemberList";
import OrderList from "./OrderList";

const SessionDetails = ({ sessionDetailsProps }) => {
       const { table, cashRequest, members, sessionOrders, loading } = sessionDetailsProps
       console.log(table.sessionId)
       const totalTableAmount = sessionOrders
              .filter((order: any) => order.status !== "Cancel")
              .reduce((total: any, order: any) =>
                     total + Number(order.orderTotal),
                     0);
       const paidAmount = sessionOrders
              .filter((order: any) => order.paymentStatus === "PAID")
              .reduce((total: any, order: any) =>
                     total + Number(order.orderTotal),
                     0);
       const pendingAmount = sessionOrders
              .filter((order: any) => order.paymentStatus === "PENDING")
              .reduce((total: any, order: any) =>
                     total + Number(order.orderTotal),
                     0);

       const remainingAmount = totalTableAmount - paidAmount - pendingAmount;

       return (
              <div className="min-h-full flex flex-col w-full">
                     {/* TABLE HEADER */}
                     <div className=" w-full sticky top-0 z-20 border-b border-gray-700 bg-[#252525] px-4 py-3 h-20 flex  items-center justify-between ">

                            <div className="flex flex-col items-start justify-between ">

                                   <div className="flex gap-2 ">
                                          <p className="text-2xl text-white-500 font-semibold">
                                                 {table.tableNumber}
                                          </p>

                                          <p className="text-2xl text-gray-500">
                                                 Table
                                          </p>
                                   </div>
                                   <div className="text-gray-500 text-sm">
                                          PIN {table.pin || "---"}
                                   </div>
                            </div>
                            <div>
                                   <span
                                          className={`rounded-full px-3 py-1.5 text-xs font-medium ${table.isOccupied
                                                 ? "bg-green-500/15 text-green-400"
                                                 : "bg-gray-500/15 text-gray-400"
                                                 }`}
                                   >
                                          {table.isOccupied
                                                 ? "● OCCUPIED"
                                                 : "○ AVAILABLE"}
                                   </span>
                            </div>
                     </div>
                     <>
                            {
                                   table.isOccupied ?
                                          (
                                                 <div className="flex w-full">

                                                        {/* LEFT CONTENT - SCROLLABLE */}
                                                        <div className="min-w-0 flex-1 space-y-3 p-3">
                                                               {
                                                                      cashRequest && (
                                                                             cashRequest.map((request: any, index: any) =>
                                                                                    <CashPaymentRequest key={index} request={request} />
                                                                             )
                                                                      )
                                                               }
                                                               {/* MEMBERS */}
                                                               <MemberList members={members} />
                                                               {/* ORDERS */}
                                                               {!loading &&
                                                                      <OrderList ordersListProps={{
                                                                             orders: sessionOrders,
                                                                             sessionId: table.sessionId,
                                                                             tableId: table._id
                                                                      }} />
                                                               }
                                                        </div>

                                                        {/* RIGHT - STICKY BILL SUMMARY */}
                                                        {
                                                               !loading &&
                                                               <div className="w-85 shrink-0 border-l border-gray-700 p-3 flex flex-col gap-2">
                                                                      <div className="sticky top-20">
                                                                             <BillSummary billSummaryProps={{
                                                                                    totalTableAmount, paidAmount, pendingAmount, remainingAmount, tableNumber: table.tableNumber
                                                                             }}
                                                                             />
                                                                      </div>
                                                                      <EndTableSessionButton
                                                                             EndTableSessionButtonProps={{
                                                                                    sessionId: table.sessionId,
                                                                                    orders: sessionOrders,
                                                                             }}
                                                                      />
                                                               </div>
                                                        }
                                                 </div>
                                          ) : (
                                                 <div className="relative top-45 flex flex-col items-center justify-center">
                                                        <p className="text-lg font-semibold text-gray-300">
                                                               Table {table.tableNumber}
                                                        </p>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                               there is no active session yet
                                                        </p>
                                                 </div>
                                          )
                            }
                     </>
              </div>
       );
};

export default SessionDetails

